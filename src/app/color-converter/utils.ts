export const formatColor = (value: number[] | string, format: string) => {
  if (Array.isArray(value)) {
    switch (format) {
      case "hex":
        return `#${value.map(v => v.toString(16).padStart(2, "0")).join("")}`;
      case "rgb":
        return `rgb(${value.join(", ")})`;
      case "hsl":
        return `hsl(${value.join(", ")})`;
      case "hsv":
        return `hsv(${value.join(", ")})`;
      case "cmyk":
        return `cmyk(${value.join(", ")})`;
      default:
        return value.join(", ");
    }
  }
  return value;
};
