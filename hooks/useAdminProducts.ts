import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAdminProductsApi,
  createAdminProductApi,
  updateAdminProductApi,
  deleteAdminProductApi,
  getAdminProfileApi,
} from "@/api/adminApi";
import {
  CreateProductPayload,
  UpdateProductPayload,
} from "@/types/admin";
import toast from "react-hot-toast";

// Fetch admin products query
export function useGetAdminProducts(params?: {
  query?: string;
  page?: number;
  limit?: number;
  sortby?: string;
}) {
  return useQuery({
    queryKey: ["admin", "products", params],
    queryFn: () => fetchAdminProductsApi(params),
    keepPreviousData: true,
  });
}

// Fetch admin profile query
export function useGetAdminProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: () => getAdminProfileApi(),
    enabled,
    retry: false,
  });
}

// Create product mutation
export function useCreateAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProductPayload) => createAdminProductApi(payload),
    onSuccess: (data) => {
      toast.success(data.message || "Product created successfully!");
      queryClient.invalidateQueries(["admin", "products"]);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create product");
    },
  });
}

// Update product mutation
export function useUpdateAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      payload,
    }: {
      productId: string;
      payload: UpdateProductPayload;
    }) => updateAdminProductApi(productId, payload),
    onSuccess: (data) => {
      toast.success(data.message || "Product updated successfully!");
      queryClient.invalidateQueries(["admin", "products"]);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update product");
    },
  });
}

// Delete product mutation
export function useDeleteAdminProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteAdminProductApi(productId),
    onSuccess: (data) => {
      toast.success(data.message || "Product deleted successfully");
      queryClient.invalidateQueries(["admin", "products"]);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });
}
