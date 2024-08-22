import { createContext } from "react";

export const ProcessCardSeachContext = createContext<{
  searchCustomer: string;
  setSearchCustomer: (value: string) => void;
  searchProcessCard: string;
  setSearchProcessCard: (value: string) => void;
}>({
  searchCustomer: "",
  setSearchCustomer: () => {},
  searchProcessCard: "",
  setSearchProcessCard: () => {},
});
