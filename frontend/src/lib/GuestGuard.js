"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestGuard({ children }) {
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      // If logged in, go to Feed immediately
      router.replace("/feed");
    } else {
      setIsGuest(true);
    }
  }, [router]);

  if (!isGuest) return null; // Show nothing while redirecting

  return <>{children}</>;
}