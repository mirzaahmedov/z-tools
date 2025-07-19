import { useCallback, useState } from "react";

export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv" | "cmyk";
export type ColorConversions = {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
};

export const colorFormats = ["hex", "rgb", "hsl", "hsv", "cmyk"] as const;

export const useConverter = () => {
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [colors, setColors] = useState<ColorConversions>(initialColors);
  const [currentColor, setCurrentColor] = useState<string>(initialColors.hex);

  const convert = useCallback(
    (color: string) => {
      const newColors = { ...initialColors };
      colorFormats.forEach(key => {
        if (key !== format) {
          newColors[key] = (convert as any)[format][key](color);
        } else {
          newColors[key] = color;
        }
      });
      setFormat(format);
      setColors(newColors);
      setCurrentColor(color);
    },
    [format],
  );

  return {
    format,
    currentColor,
    colors,
    convert,
    setFormat,
  };
};

const initialColors = {
  hex: "#000000",
  rgb: "rgb(0, 0, 0)",
  hsl: "hsl(0, 0%, 0%)",
  hsv: "hsv(0, 0%, 0%)",
  cmyk: "cmyk(0%, 0%, 0%, 100%)",
};
