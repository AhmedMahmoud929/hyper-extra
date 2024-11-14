import Axios from "@/api/axios";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery, QueryClient } from "react-query";

// Query Fetchers
const fetchAllCategories = async () => {
  try {
    const res = await Axios.get("/categories");
    const resData = res.data;
    const allCategories = resData.data.categories;
    if (!resData || !allCategories) {
      throw new Error("No categories found");
    }

    return allCategories;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = axiosError.message || "Failed to fetch categories";
    throw new Error(message);
  }
};

const createNewCategory = async ({
  name,
  image,
}: {
  name: string;
  image: File;
}) => {
  try {
    const formData = new FormData();
    console.log(image);
    if (!name) throw new Error("Category name is required");
    if (!image) throw new Error("Category image is required");
    formData.append("name", name);
    formData.append("image", image);

    const res = await axios.post(
      "https://ecomdev-d1485e509396.herokuapp.com/api/v1/categories",
      formData
    );

    return {
      success: true,
      message: "Category created successfully",
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;
    const message = axiosError.message || "Failed to create category";
    throw new Error(message);
  }
};

const deleteCategoryById = async (id: string) => {
  try {
    if (!id) throw new Error("Category id is required");

    const res = await Axios.delete(`/categories/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;
    const message = axiosError.message || "Failed to create category";
    throw new Error(message);
  }
};

// Query Handlers
export const useCreateCategory = () =>
  useMutation(["create-category"], createNewCategory);

export const useDeleteCategory = () =>
  useMutation(["delete-category"], deleteCategoryById);

export const useAllCategories = () =>
  useQuery(["all-categories"], fetchAllCategories);
