"use client";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";

import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
} from "@components/ui/command";
import { Button } from "@components/ui/button";

interface Store {
  id: number;
  name: string;
}

const stores: Store[] = [
  { id: 1, name: "Store 1" },
  { id: 2, name: "Store 2" },
  { id: 3, name: "Store 3" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState("");

  return (
    <h1>hei</h1>
    // <Command>
    //   <CommandInput placeholder="Search stores" />
    //   <CommandGroup>
    //     {stores.map((store) => (
    //       <CommandItem
    //         key={store.id}
    //         value={store.name}
    //         onSelect={(selectedStore) => {
    //           setStore(selectedStore === store.name ? "" : selectedStore);
    //           setOpen(false);
    //         }}
    //       >
    //         {store.name}
    //       </CommandItem>
    //     ))}
    //   </CommandGroup>
    // </Command>
  );
};

export default Navbar;
