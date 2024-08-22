import { lazy } from "react";
import { RouteObject, createBrowserRouter, Navigate } from "react-router-dom";
import PageLayout from "@/layout";
import { LazyElement } from "@/utils/lazyLoad";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/home"} />,
  },
  {
    path: "/home",
    element: <PageLayout />,
    children: [
      {
        path: "/home",
        element: LazyElement(lazy(() => import("@/pages/home"))),
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
