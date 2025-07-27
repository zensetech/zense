"use client";

import { useAuth } from "@/app/context/AuthContext";
import AdminLogin from "@/components/AdminLogin";
import { AuthProvider } from "@/app/context/AuthContext";

export default function BlogAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthContent>{children}</AuthContent>
    </AuthProvider>
  );
}

function AuthContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <div>{children}</div>;
}
