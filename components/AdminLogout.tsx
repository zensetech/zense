"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("adminemail");
    localStorage.removeItem("adminpassword");
    logout();
    router.push("/admin");
  }, [logout, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-semibold text-gray-800">
        Logging you out...
      </h1>
    </div>
  );
}
