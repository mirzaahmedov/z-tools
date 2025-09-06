"use client";

import Link from "next/link";
import { Button, Flex, Popover, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

import { Settings } from "./Settings";
import { Logo } from "@/assets/illustration/Logo";
import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/features/theme/ThemeSwitch"));

export const Header = () => {
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
        <ThemeSwitch />
      </Flex>
    </header>
  );
};
