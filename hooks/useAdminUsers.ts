import { useQuery } from "@tanstack/react-query";
import { fetchAdminUsersApi, fetchAdminUserByIdApi } from "@/api/adminApi";

export function useGetAdminUsers(params?: {
  query?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortby?: string;
}) {
  return useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => fetchAdminUsersApi(params),
    keepPreviousData: true,
  });
}

export function useGetAdminUserById(userId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["admin", "users", userId],
    queryFn: () => fetchAdminUserByIdApi(userId),
    enabled: Boolean(userId) && enabled,
  });
}
