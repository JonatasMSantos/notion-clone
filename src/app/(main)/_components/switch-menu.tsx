"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface SwitchMenuProps {}
export const SwitchMenu = ({}: SwitchMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const changeTab = (value: string) => {
    router.push(pathname + "?" + createQueryString("view", value));
  };

  return (
    <Tabs defaultValue="notes" className="w-full" onValueChange={changeTab}>
      <TabsList className="ml-12">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="board">Board</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
export default SwitchMenu;
