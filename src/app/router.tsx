import { Navigate, createBrowserRouter } from "react-router-dom";

import JSONToTypescriptRoute from "./json-to-typescript/route";
import MainLayout from "./__layout__/main";
import ColorConverterRoute from "./color-converter/route";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <MainLayout />,
    children: [
      JSONToTypescriptRoute,
      ColorConverterRoute,
      {
        path: "*",
        element: <Navigate to={JSONToTypescriptRoute.path} />,
      },
    ],
  },
]);
