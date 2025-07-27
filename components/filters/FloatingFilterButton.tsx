"use client";

import { Suspense, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterBar } from "./FilterBar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FloatingFilterButton() {
  const [open, setOpen] = useState(false);

  const handleFiltersApplied = () => {
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 lg:hidden z-50">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-full shadow-lg">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[80vh]">
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full pr-4 mt-6">
            <Suspense fallback={<div>Loading...</div>}>
              <FilterBar onApplyFilters={handleFiltersApplied} />
            </Suspense>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
