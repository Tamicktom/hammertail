//* Librarie imports
import Vibrant from "node-vibrant";

//* Types
export type RGB_String = `rgb(${number},${number},${number})`;
export type RGBA_String = `rgba(${number},${number},${number},${number})`;
export type RGB_Array = [number, number, number];
export type RGBA_Array = [number, number, number, number];

/**
 * Get the RGB pallette from an image
 * @param url The url of the image
 * @returns The RGB pallette
 */
export async function getRGBPalletteFromImage(url: string) {
  let rgb: RGB_Array = [0, 0, 0];
  const pallette = new Vibrant(url);
  await pallette.getPalette((err, palette) => {
    if (err) throw err;
    if (palette) {
      const { Vibrant } = palette;
      if (Vibrant) {
        rgb = Vibrant.rgb;
      }
    }
  });
  return rgb;
}

/**
 * Get the RGBA pallette from an image
 * @param url The url of the image
 * @returns The RGBA pallette
 */

export async function getRGBAPalletteFromImage(url: string) {
  let rgb: RGB_Array = [0, 0, 0];
  const pallette = new Vibrant(url);
  await pallette.getPalette((err, palette) => {
    if (err) throw err;
    if (palette) {
      const { Vibrant } = palette;
      if (Vibrant) {
        rgb = Vibrant.rgb;
      }
    }
  });

  return [...rgb, 1] as RGBA_Array;
}

/**
 * Get the luminance of a color
 * @param r The red value
 * @param g The green value
 * @param b The blue value
 * @returns The luminance
 */

export function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  if (a[0] === undefined || a[1] === undefined || a[2] === undefined) return 0;
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Get the contrast between two colors. The contrast is calculated using the luminance of the colors. The W3C recommends a contrast ratio of at least 7 for normal purposes.
 * @param rgb1 The first color
 * @param rgb2 The second color
 * @returns The contrast
 */

export function contrast(
  rgb1: RGB_Array | RGBA_Array,
  rgb2: RGB_Array | RGBA_Array
): number {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function arrayToRGBString(array: [number, number, number]) {
  return `rgb(${array[0]},${array[1]},${array[2]})` as RGB_String;
}

export function arrayToRGBAString(array: [number, number, number, number]) {
  return `rgba(${array[0]},${array[1]},${array[2]},${array[3]})` as RGBA_String;
}

export function rgbStringToArray(rgb: RGB_String) {
  const rgbArray = rgb
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((v) => parseInt(v));
  return rgbArray as RGB_Array;
}

export function rgbaStringToArray(rgba: RGBA_String) {
  const rgbaArray = rgba
    .replace("rgba(", "")
    .replace(")", "")
    .split(",")
    .map((v) => parseInt(v));
  return rgbaArray as RGBA_Array;
}
