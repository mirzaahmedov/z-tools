"use client";

import { ThemeProvider } from "@/features/theme/provider";
import { useThemeStore } from "@/features/theme/store";
import { App, ConfigProvider, theme } from "antd";
import { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const themeValue = useThemeStore((store) => store.theme);

  console.log(themeValue);

  //   theme={{
  //   algorithm:
  //     themeValue === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  //   token: {
  //     colorPrimary: "#58a6ff",
  //     colorText: themeValue === "dark" ? "#c9d1d9" : "#6e7781",
  //     colorBgElevated: themeValue === "dark" ? "#0d1117" : "#ffffff",
  //     colorBgContainer: themeValue === "dark" ? "#161b22" : "#f6f8fa",
  //   },
  // }}

  return (
    <ConfigProvider>
      <App className="h-full">
        {children}
        <ThemeProvider />
      </App>
    </ConfigProvider>
  );
};
