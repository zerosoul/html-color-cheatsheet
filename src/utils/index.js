function padZero(str, len = 2) {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
export function invertColor(hex, bw = false) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
}
export const hexToRgb = hex =>
  hex
    .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16));

export function RgbToHsl(rgb) {
  const [r, g, b] = rgb;
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;

  const maxColor = Math.max(r1, g1, b1);
  const minColor = Math.min(r1, g1, b1);
  // Calculate L:
  let L = (maxColor + minColor) / 2;
  let S = 0;
  let H = 0;
  if (maxColor != minColor) {
    // Calculate S:
    if (L < 0.5) {
      S = (maxColor - minColor) / (maxColor + minColor);
    } else {
      S = (maxColor - minColor) / (2.0 - maxColor - minColor);
    }
    // Calculate H:
    if (r1 == maxColor) {
      H = (g1 - b1) / (maxColor - minColor);
    } else if (g1 == maxColor) {
      H = 2.0 + (b1 - r1) / (maxColor - minColor);
    } else {
      H = 4.0 + (r1 - g1) / (maxColor - minColor);
    }
  }

  L *= 100;
  S *= 100;
  H *= 60;
  if (H < 0) {
    H += 360;
  }
  const result = [Math.round(H), `${Math.round(S)}%`, `${Math.round(L)}%`];
  return result;
}
export function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos);
}
