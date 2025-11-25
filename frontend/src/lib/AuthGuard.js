"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "./features/api/apiSlice";

export default function AuthGuard({ children }) {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isError) {
      router.push("/");
    }
  }, [isLoading, isError, router]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  return <>{children}</>;

  return null;
}