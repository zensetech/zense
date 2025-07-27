"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Hospital,
} from "lucide-react";
import { AuthProvider } from "@/app/context/AuthContext";
import AdminLogin from "@/components/AdminLogin";

export function isAdminAuthenticated(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      const email = localStorage.getItem("adminemail");
      const password = localStorage.getItem("adminpassword");
      if (email === "admin@Zense.in" && password === "admin123") {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  return isAuthenticated;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, route: "/admin/dashboard" },
    { name: "Senior Care Homes", icon: <Home />, route: "/admin/homes" },
    { name: "Providers", icon: <Hospital />, route: "/admin/providers" },
    { name: "Attendants", icon: <Users />, route: "/admin/attendants" },
    // { name: "Settings", icon: <Settings />, route: "/admin/settings" },
    { name: "Logout", icon: <LogOut />, route: "/admin/logout" },
  ];

  if (!isAdminAuthenticated()) {
    return (
      <AuthProvider>
        <AdminLogin />
      </AuthProvider>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-20 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
      >
        {/* Logo and Close Button */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-teal-700 ml-10">Zense</h1>
        </div>

        {/* Menu Items */}
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.route}
                  className={`flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-colors
                    ${
                      active === item.name
                        ? "bg-teal-700 text-white"
                        : "text-black hover:bg-gray-100"
                    }
                  `}
                  onClick={() => setActive(item.name)}
                >
                  <div
                    className={`w-6 h-6 flex-shrink-0 ${
                      active === item.name ? "text-white" : "text-teal-700"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            &copy; 2025 Zense. All rights reserved.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-16"
        } p-6`}
      >
        {children}
      </div>

      {/* Button to toggle Sidebar */}
      <button
        className="fixed z-30 top-4 left-4 p-2 rounded-lg bg-gray-200 text-black md:block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Button to open Sidebar on Mobile, only when sidebar is closed */}
      {!isOpen && (
        <button
          className="fixed z-30 top-4 left-4 p-2 rounded-lg bg-gray-200 text-black md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
