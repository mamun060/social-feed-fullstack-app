"use client"; // Must be client side to read LocalStorage

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Check token in LocalStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
      // 2. Redirect if not found
      router.push("/login");
    } else {
      // 3. Allow access
      setIsAuthorized(true);
    }
  }, [router]);

  // 4. Show nothing (or a skeleton) while checking to prevent "Flash of Content"
  if (!isAuthorized) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;

  }

  return <>{children}</>;
}