import { createContext } from "react";

export const GlobalContext = createContext<{
  homeRightItemName: string;
  setHomeRightItemName: (name: string) => void;
}>({
  homeRightItemName: "",
  setHomeRightItemName: () => {},
});
