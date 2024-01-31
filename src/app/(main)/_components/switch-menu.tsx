import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SwitchMenuProps {}
export const SwitchMenu = ({}: SwitchMenuProps) => {
  const changeTab = (value: string) => {
    console.log(value);
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
