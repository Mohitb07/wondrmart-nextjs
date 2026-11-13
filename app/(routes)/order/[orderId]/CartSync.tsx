"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function CartSync() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cartCount"] });
    queryClient.invalidateQueries({ queryKey: ["cartItems"] });
  }, [queryClient]);

  return null;
}