"use client";

import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Flex, Switch } from "antd";
import { useThemeStore } from "./store";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);

  return (
    <Flex align="center" gap={10}>
      <MoonFilled className="text-solarized-base0 block" />
      <Switch
        checked={isChecked}
        onChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <SunFilled className="text-solarized-base0 block" />
    </Flex>
  );
};

export default ThemeSwitch;
