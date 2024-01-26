"use client";

import { useRef } from "react";

import { Skeleton } from "@/components/ui/skeleton";

export const Title = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return <div className="flex items-center gap-x-1"></div>;
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
