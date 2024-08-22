import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import store from "@/store";
import { Provider } from "react-redux";
import { GlobalContext } from "./context";

const App: React.FC = () => {
  const [homeRightItemName, setHomeRightItemName] = useState("");

  return (
    <ConfigProvider theme={{}}>
      <Provider store={store}>
        <GlobalContext.Provider
          value={{ homeRightItemName, setHomeRightItemName }}
        >
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
