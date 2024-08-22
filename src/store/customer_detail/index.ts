import type { RootState } from "../index";
import type {
  CustomerDetail,
  Customer,
  ProcessCard,
  Steel,
} from "@/service/home";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerDetailState extends CustomerDetail {
  currentCustomer: string;
}

const initialState: CustomerDetailState = {
  customer: {
    name: "",
    code: "",
    updatedAt: "",
    processCardCount: 0,
    orderCount: 0,
    orderDetailCount: 0,
  },
  processCards: [],
  steels: [],
  currentCustomer: "",
};

const customerDetailSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setCustomerDetail(state, action: PayloadAction<CustomerDetail>) {
      state = { ...state, ...action.payload };
      return state;
    },
    setCustomer(state, action: PayloadAction<Customer>) {
      state.customer = action.payload;
    },
    setProcessCards(state, action: PayloadAction<ProcessCard[]>) {
      state.processCards = action.payload;
    },
    setSteels(state, action: PayloadAction<Steel[]>) {
      state.steels = action.payload;
    },
    setCurrentCustomer(state, action: PayloadAction<string>) {
      state.currentCustomer = action.payload;
    },
  },
});

export const {
  setCurrentCustomer,
  setCustomerDetail,
  setCustomer,
  setProcessCards,
  setSteels,
} = customerDetailSlice.actions;

export const selectCustomer = (state: RootState) =>
  state.customerDetail.customer;
export const selectProcessCards = (state: RootState) =>
  state.customerDetail.processCards;
export const selectSteels = (state: RootState) => state.customerDetail.steels;
export const selectCurrentCustomer = (state: RootState) =>
  state.customerDetail.currentCustomer;

export default customerDetailSlice.reducer;
