"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/blog/ThemeToggle";

interface BlogHeaderProps {
  showHeader: boolean;
}

export default function BlogHeader({ showHeader }: BlogHeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        showHeader ? "" : "header-hidden"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img alt="" src="/uploads/icon.png" width={50} height={50} />
              <span className="text-2xl font-bold text-teal-700">Zense</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* <ThemeToggle /> */}
            <Link
              key={"Find Care"}
              href={"/providers"}
              className="text-gray-700 hover:text-teal-700 transition-colors"
            >
              {"Find Care"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
