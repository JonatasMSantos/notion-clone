"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Publish = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72"
        align="end"
        alignOffset={8}
        forceMount
      ></PopoverContent>
    </Popover>
  );
};
