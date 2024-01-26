"use client";

import { Spinner } from "@/components/spinner";

export const TrashBox = () => {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <Spinner size="lg" />
    </div>
  );
};
