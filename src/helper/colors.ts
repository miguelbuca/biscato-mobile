export function checkAndConvertColor(color: string) {
  color = color.trim();

  let rgbMatch = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (rgbMatch) {
    const red = parseInt(rgbMatch[1]);
    const green = parseInt(rgbMatch[2]);
    const blue = parseInt(rgbMatch[3]);
    return rgbToHex(red, green, blue);
  }

  let rgbaMatch = color.match(
    /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i
  );
  if (rgbaMatch) {
    const red = parseInt(rgbaMatch[1]);
    const green = parseInt(rgbaMatch[2]);
    const blue = parseInt(rgbaMatch[3]);
    return rgbToHex(red, green, blue);
  }

  let hexMatch = color.match(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  if (hexMatch) {
    const hexValue = hexMatch[1];
    return normalizeHex(hexValue);
  }

  return null;
}

function rgbToHex(red: number, green: number, blue: number) {
  const normalizedRed = normalizeComponent(red);
  const normalizedGreen = normalizeComponent(green);
  const normalizedBlue = normalizeComponent(blue);
  return `#${normalizedRed}${normalizedGreen}${normalizedBlue}`;
}

function normalizeComponent(component: number) {
  const hex = component.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function normalizeHex(hexValue: string) {
  if (hexValue.length === 3) {
    // Expand shorthand hex value (#F00 -> #FF0000)
    hexValue = hexValue.replace(
      /^([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/,
      "$1$1$2$2$3$3"
    );
  }
  return `#${hexValue}`;
}
