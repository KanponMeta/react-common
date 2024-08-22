import { useState, useEffect } from "react";
import {
  getCustomerDetail,
} from "@/service/home";
import _ from "lodash";
import { useAppDispatch } from "@/store/hooks";

import {
  setCustomerDetail,
  setCurrentCustomer,
} from "@/store/customer_detail";

import { ProcessCardSeachContext } from "./context";


import "./index.scss";

function Home() {
  const dispatch = useAppDispatch();
  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const [searchProcessCard, setSearchProcessCard] = useState<string>("");

  // 来源于用户点击
  useEffect(() => {
    if (_.isEmpty(searchCustomer)) return;

    getCustomerDetail(searchCustomer).then((res) => {
      dispatch(setCustomerDetail(res.data));
      dispatch(setCurrentCustomer(res.data.customer.code || ""));
    });
  }, [searchCustomer]);

  return (
    <ProcessCardSeachContext.Provider
      value={{
        searchCustomer,
        setSearchCustomer,
        searchProcessCard,
        setSearchProcessCard,
      }}
    >
     
        <div>hello</div>

    </ProcessCardSeachContext.Provider>
  );
}

export default Home;
