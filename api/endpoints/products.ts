import { AxiosError } from "axios";
import Axios from "../axios";
import { useQuery } from "react-query";

// Query Fetchers
const fetchAllProducts = async () => {
  try {
    const res = await Axios.get("/products");
    const resData = res.data;
    const allProducts = resData.data;

    if (!resData || !allProducts) {
      throw new Error("No products found");
    }

    return allProducts;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = axiosError.message || "Failed to fetch products";
    throw new Error(message);
  }
};

// Query Handlers
export const useAllProducts = () =>
  useQuery(["all-products"], fetchAllProducts);
