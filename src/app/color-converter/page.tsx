"use client";

import {
  Button,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Typography,
  message,
  Space,
} from "antd";
import { CopyOutlined, BgColorsOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import convert from "color-convert";

const { Title, Text } = Typography;

interface ColorValues {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  hwb: string;
  lab: string;
  lch: string;
  xyz: string;
  cmyk: string;
}

export const metadata = {
  title: "Color Converter – Z Tools",
  description:
    "Easily convert colors between HEX, RGB, HSL, and more formats using Z Tools.",
};

const ColorConverterPage = () => {
  const [inputValue, setInputValue] = useState("#3b82f6");
  const [colorValues, setColorValues] = useState<ColorValues>({
    hex: "",
    rgb: "",
    hsl: "",
    hsv: "",
    hwb: "",
    lab: "",
    lch: "",
    xyz: "",
    cmyk: "",
  });
  const [previewColor, setPreviewColor] = useState("#3b82f6");

  const parseColorInput = (
    input: string
  ): { type: string; values: number[] } | null => {
    const trimmed = input.trim().toLowerCase();

    // Hex color
    const hexMatch = trimmed.match(/^#?([a-f0-9]{3}|[a-f0-9]{6})$/i);
    if (hexMatch) {
      const hex = hexMatch[1];
      const fullHex =
        hex.length === 3
          ? hex
              .split("")
              .map((c) => c + c)
              .join("")
          : hex;
      return {
        type: "hex",
        values: [
          parseInt(fullHex.slice(0, 2), 16),
          parseInt(fullHex.slice(2, 4), 16),
          parseInt(fullHex.slice(4, 6), 16),
        ],
      };
    }

    // RGB color
    const rgbMatch = trimmed.match(
      /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
    );
    if (rgbMatch) {
      return {
        type: "rgb",
        values: [
          parseInt(rgbMatch[1]),
          parseInt(rgbMatch[2]),
          parseInt(rgbMatch[3]),
        ],
      };
    }

    // HSL color
    const hslMatch = trimmed.match(
      /hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/
    );
    if (hslMatch) {
      return {
        type: "hsl",
        values: [
          parseInt(hslMatch[1]),
          parseInt(hslMatch[2]),
          parseInt(hslMatch[3]),
        ],
      };
    }

    return null;
  };

  const convertColor = useCallback((input: string) => {
    try {
      const parsed = parseColorInput(input);
      if (!parsed) {
        throw new Error("Invalid color format");
      }

      let rgb: [number, number, number];

      switch (parsed.type) {
        case "hex":
        case "rgb":
          rgb = parsed.values as [number, number, number];
          break;
        case "hsl":
          rgb = convert.hsl.rgb(parsed.values as [number, number, number]);
          break;
        default:
          throw new Error("Unsupported color type");
      }

      // Convert to all formats
      const hex = `#${convert.rgb.hex(rgb)}`;
      const hsl = convert.rgb.hsl(rgb);
      const hsv = convert.rgb.hsv(rgb);
      const hwb = convert.rgb.hwb(rgb);
      const lab = convert.rgb.lab(rgb);
      const lch = convert.rgb.lch(rgb);
      const xyz = convert.rgb.xyz(rgb);
      const cmyk = convert.rgb.cmyk(rgb);

      setColorValues({
        hex: hex.toUpperCase(),
        rgb: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
        hsl: `hsl(${Math.round(hsl[0])}, ${Math.round(hsl[1])}%, ${Math.round(hsl[2])}%)`,
        hsv: `hsv(${Math.round(hsv[0])}, ${Math.round(hsv[1])}%, ${Math.round(hsv[2])}%)`,
        hwb: `hwb(${Math.round(hwb[0])}, ${Math.round(hwb[1])}%, ${Math.round(hwb[2])}%)`,
        lab: `lab(${Math.round(lab[0])}, ${Math.round(lab[1])}, ${Math.round(lab[2])})`,
        lch: `lch(${Math.round(lch[0])}, ${Math.round(lch[1])}, ${Math.round(lch[2])})`,
        xyz: `xyz(${Math.round(xyz[0] * 100) / 100}, ${Math.round(xyz[1] * 100) / 100}, ${Math.round(xyz[2] * 100) / 100})`,
        cmyk: `cmyk(${Math.round(cmyk[0])}%, ${Math.round(cmyk[1])}%, ${Math.round(cmyk[2])}%, ${Math.round(cmyk[3])}%)`,
      });

      setPreviewColor(hex);
    } catch {
      message.error(
        "Invalid color format. Please use hex (#FF0000), rgb(255, 0, 0), or hsl(0, 100%, 50%)"
      );
    }
  }, []);

  const copyToClipboard = async (value: string, format: string) => {
    try {
      await navigator.clipboard.writeText(value);
      message.success(`${format} value copied to clipboard!`);
    } catch {
      message.error("Failed to copy to clipboard");
    }
  };

  useEffect(() => {
    convertColor(inputValue);
  }, [convertColor, inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value.trim()) {
      convertColor(value);
    }
  };

  const colorFormats = [
    { label: "HEX", value: colorValues.hex, key: "hex" },
    { label: "RGB", value: colorValues.rgb, key: "rgb" },
    { label: "HSL", value: colorValues.hsl, key: "hsl" },
    { label: "HSV", value: colorValues.hsv, key: "hsv" },
    { label: "HWB", value: colorValues.hwb, key: "hwb" },
    { label: "LAB", value: colorValues.lab, key: "lab" },
    { label: "LCH", value: colorValues.lch, key: "lch" },
    { label: "XYZ", value: colorValues.xyz, key: "xyz" },
    { label: "CMYK", value: colorValues.cmyk, key: "cmyk" },
  ];

  return (
    <div className="h-full p-6 overflow-auto bg-gh-bg">
      <div className="max-w-4xl mx-auto">
        <Flex align="center" gap={16} className="mb-6 text-gh-muted">
          <BgColorsOutlined className="text-2xl text-gh-accent-emphasis" />
          <Title level={2} className="!mb-0">
            Color Converter
          </Title>
        </Flex>

        <Text type="secondary" className="block mb-6">
          Convert colors between different formats. Supports HEX, RGB, and HSL
          input formats.
        </Text>

        {/* Input Section */}
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={16} md={18}>
              <Space direction="vertical" className="w-full">
                <Text strong>Enter Color Value:</Text>
                <Input
                  size="large"
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Enter color (e.g., #FF0000, rgb(255, 0, 0), hsl(0, 100%, 50%))"
                  className="font-mono"
                />
                <Text type="secondary" className="text-xs">
                  Examples: #FF0000, rgb(255, 0, 0), hsl(0, 100%, 50%)
                </Text>
              </Space>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Space direction="vertical" className="w-full">
                <Text strong>Preview:</Text>
                <div
                  className="w-full h-16 border-2 border-gh-border rounded-lg shadow-inner"
                  style={{ backgroundColor: previewColor }}
                />
                <Text type="secondary" className="text-center text-xs">
                  {previewColor}
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Color Format Cards */}
        <Row gutter={[16, 16]}>
          {colorFormats.map((format) => (
            <Col xs={24} sm={12} md={8} key={format.key}>
              <Card
                className="h-full"
                title={
                  <Flex justify="space-between" align="center">
                    <Text strong>{format.label}</Text>
                    <Button
                      type="text"
                      size="small"
                      icon={<CopyOutlined />}
                      onClick={() =>
                        copyToClipboard(format.value, format.label)
                      }
                      className="opacity-60 hover:opacity-100"
                    />
                  </Flex>
                }
              >
                <Space direction="vertical" className="w-full">
                  <Input
                    value={format.value}
                    readOnly
                    className="font-mono bg-gh-canvas-subtle"
                    onClick={() => copyToClipboard(format.value, format.label)}
                  />
                  {format.key === "hex" && (
                    <div
                      className="w-full h-8 rounded border"
                      style={{ backgroundColor: format.value }}
                    />
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Help Section */}
        <Card className="mt-6">
          <Title level={4}>Supported Input Formats:</Title>
          <Space direction="vertical" size={4}>
            <Text>
              • <Text code>HEX:</Text> #FF0000, #F00, FF0000
            </Text>
            <Text>
              • <Text code>RGB:</Text> rgb(255, 0, 0)
            </Text>
            <Text>
              • <Text code>HSL:</Text> hsl(0, 100%, 50%)
            </Text>
          </Space>
          <Title level={4} className="mt-4">
            Output Formats:
          </Title>
          <Space direction="vertical" size={4}>
            <Text>
              • <Text code>HEX:</Text> Hexadecimal color notation
            </Text>
            <Text>
              • <Text code>RGB:</Text> Red, Green, Blue color model
            </Text>
            <Text>
              • <Text code>HSL:</Text> Hue, Saturation, Lightness color model
            </Text>
            <Text>
              • <Text code>HSV:</Text> Hue, Saturation, Value color model
            </Text>
            <Text>
              • <Text code>HWB:</Text> Hue, Whiteness, Blackness color model
            </Text>
            <Text>
              • <Text code>LAB:</Text> CIELAB color space
            </Text>
            <Text>
              • <Text code>LCH:</Text> Lightness, Chroma, Hue color space
            </Text>
            <Text>
              • <Text code>XYZ:</Text> CIE XYZ color space
            </Text>
            <Text>
              • <Text code>CMYK:</Text> Cyan, Magenta, Yellow, Key (black) color
              model
            </Text>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ColorConverterPage;
