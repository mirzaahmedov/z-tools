"use client";

import Link from "next/link";
import { Button, Flex, Popover, Switch, Menu } from "antd";
import { MoonFilled, SettingOutlined, SunFilled } from "@ant-design/icons";
import { usePathname } from "next/navigation";

import { Settings } from "./Settings";
import { useThemeStore } from "@/features/theme/store";
import { Logo } from "@/assets/illustration/Logo";

export const Header = () => {
  const { theme, setTheme } = useThemeStore();

  const pathname = usePathname();
  const navigationItems = [
    {
      key: "json-to-typescript",
      label: <Link href="/json-to-typescript">JSON to TypeScript</Link>,
    },
    {
      key: "color-converter",
      label: <Link href="/color-converter">Color Converter</Link>,
    },
  ];

  const currentPath = pathname.slice(1); // Remove leading slash

  return (
    <header className="border-b border-gh-border p-4 flex items-center gap-10 bg-gh-code-bg">
      <Logo className="h-8" />

      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]}
        items={navigationItems}
        className="flex-1 border-none bg-transparent"
        style={{ minWidth: 0 }}
      />

      <Flex align="center" gap={10}>
        <Popover
          content={<Settings />}
          trigger="click"
          styles={{
            body: {
              width: 300,
            },
          }}
        >
          <Button variant="outlined" icon={<SettingOutlined />} />
        </Popover>
        {/* <MoonFilled className="text-solarized-base0 block" />
        <Switch
          checked={theme === "dark"}
          onChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
        <SunFilled className="text-solarized-base0 block" /> */}
      </Flex>
    </header>
  );
};
