"use client";

import { ReactNode, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Trash } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Category } from "@/lib/types";
import { useDeleteCategory } from "@/api/endpoints/categories";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import { getErrorMsg } from "@/lib/utils";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedFilteredCats, setSortedFilteredCats] =
    useState<Category[]>(categories);
  const { mutate } = useDeleteCategory();
  const queryClient = useQueryClient();

  useEffect(() => {
    const newArr = categories
      .filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const field = sortField as keyof Category;
        if (sortOrder === "asc") {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    setSortedFilteredCats(newArr);
  }, [categories, sortOrder, searchTerm, sortField]);

  const toggleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortButton = ({
    field,
    children,
  }: {
    field: string;
    children: ReactNode;
  }) => (
    <Button
      variant="ghost"
      onClick={() => toggleSort(field)}
      className="font-semibold"
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );

  const handleCategoryDelete = (id: string) => {
    toast("Category deleting...", { description: "Please wait a second" });

    mutate(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["all-categories"]);
        toast("Category deleted successfully");
      },
      onError: (error) => {
        toast("Category deletion failed", { description: getErrorMsg(error) });
      },
    });
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-0">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-14"
        />
      </div>

      {!sortedFilteredCats.length && (
        <h1 className="bg-gray-200 w-full text-center mb-4 p-4">
          Cannot find a category with query: "{searchTerm}"
        </h1>
      )}
      {!!sortedFilteredCats.length && (
        <div className="flex-grow overflow-x-auto bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[10%] hidden md:table-cell">
                  ID
                </TableHead>
                <TableHead className="text-center w-[20%]">Icon</TableHead>
                <TableHead className="text-center w-[40%]">
                  <SortButton field="name">Name</SortButton>
                </TableHead>
                <TableHead className="text-center w-[20%] hidden md:table-cell">
                  <SortButton field="_id">Items Count</SortButton>
                </TableHead>
                <TableHead className="text-center w-[10%]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-center">
              {sortedFilteredCats.map((category, ix) => (
                <TableRow key={category._id}>
                  <TableCell className="font-medium hidden md:table-cell">
                    {ix}
                  </TableCell>
                  <TableCell className="text-center">
                    <Avatar className="w-8 h-8 inline-flex items-center justify-center bg-gray-100">
                      <AvatarImage src={category.image} alt={category.name} />
                      <AvatarFallback>
                        {category.name.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {category.name}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    {category._id}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className="hover:bg-red-100 hover:text-red-800"
                      size="icon"
                      onClick={() => handleCategoryDelete(category._id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete category</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
