"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/lib/features/api/apiSlice";

export default function AuthGuard({ children }) {
  const router = useRouter();
  
  // 1. The query automatically sends the HttpOnly cookie to backend
  const { data: user, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    // 2. If finished loading and NO user found (Error 401), kick them out
    if (!isLoading && isError) {
      router.push("/"); // Redirect to Login
    }
  }, [isLoading, isError, router]);

  // 3. Show a loader while we ask the server
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 4. If we have a user, render the protected page
  if (user) {
    return <>{children}</>;
  }

  return null; // Return null while redirecting
}

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useGetUserQuery } from "./features/api/apiSlice";

// export default function AuthGuard({ children }) {
//   const { data: user, isLoading, isError } = useGetUserQuery();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && isError) {
//       router.push("/");
//     }
//   }, [isLoading, isError, router]);

//   if (isLoading) {
//     return <div className="flex h-screen items-center justify-center">Loading...</div>;
//   }
//   return <>{children}</>;

//   return null;
// }