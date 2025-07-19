import ColorConverterPage from "./page";
import type { RouteObject } from "react-router-dom";

export default {
  path: "color-converter",
  element: <ColorConverterPage />,
} as const satisfies RouteObject;
