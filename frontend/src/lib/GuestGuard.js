"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/lib/features/api/apiSlice";

export default function GuestGuard({ children }) {
  const router = useRouter();
  
  // 1. Ask server if we are already logged in
  const { data: user, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    // 2. If user exists, bounce them to the Feed
    if (!isLoading && user) {
      router.replace("/feed"); 
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
        </div>
      );
  }

  // 3. If NO user (Error), allow access to Login/Register page
  if (isError || !user) {
    return <>{children}</>;
  }

  return null;
}

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function GuestGuard({ children }) {
//   const router = useRouter();
//   const [isGuest, setIsGuest] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");

//     if (token) {
//       // If logged in, go to Feed immediately
//       router.replace("/feed");
//     } else {
//       setIsGuest(true);
//     }
//   }, [router]);

//   if (!isGuest) return null; // Show nothing while redirecting

//   return <>{children}</>;
// }