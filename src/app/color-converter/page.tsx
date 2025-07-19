import converter from "color-convert";

import {
  colorFormats,
  useConverter,
  type ColorFormat,
} from "@/features/color/use-converter";
import { ColorPicker, Input, Select } from "antd";

const formatters = {
  hex: (color: any) => `${color}`,
  rgb: (color: any) => `rgb(${color?.join(", ")})`,
  hsl: (color: any) => `hsl(${color?.join(", ")})`,
  hsv: (color: any) => `hsv(${color?.join(", ")})`,
  cmyk: (color: any) => `cmyk(${color?.join(", ")})`,
};

const ColorConverterPage = () => {
  const { colors, currentColor, format, convert, setFormat } = useConverter();

  return (
    <div className="h-full flex-1 bg-solarized-base03 py-20">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="p-1 flex items-center gap-0.5">
          <ColorPicker
            size="large"
            value={currentColor}
            onChange={color => {
              let colorValue = "";
              switch (format) {
                case "hex":
                  colorValue = color.toHexString();
                  break;
                case "rgb":
                  colorValue = color.toRgbString();
                  break;
                case "hsl":
                  colorValue = `hsl(${converter.rgb
                    .hsl(color.toRgb().r, color.toRgb().g, color.toRgb().b)
                    .join(", ")})`;
                  break;
                case "hsv":
                  colorValue = `hsv(${converter.rgb
                    .hsv(color.toRgb().r, color.toRgb().g, color.toRgb().b)
                    .join(", ")})`;
                  break;
                case "cmyk":
                  colorValue = `cmyk(${converter.rgb
                    .cmyk(color.toRgb().r, color.toRgb().g, color.toRgb().b)
                    .join(", ")})`;
                  break;
              }
              convert(colorValue);
            }}
          />
          <Input
            size="large"
            value={currentColor}
            onChange={e => convert(e.target.value)}
          />
          <Select
            size="large"
            value={format}
            onChange={setFormat}
            options={colorFormats.map(format => ({
              label: format.toUpperCase(),
              value: format,
            }))}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-[repeat(5,minmax(200px,1fr))] gap-4 p-4 mt-10">
        {Object.keys(colors)
          .filter(color => format !== color)
          .map(color => (
            <div
              key={color}
              className="p-4 border rounded"
            >
              <div className="font-bold">{color.toUpperCase()}</div>
              <div>
                {formatters?.[color as unknown as ColorFormat]?.(
                  colors[color as unknown as ColorFormat],
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ColorConverterPage;
