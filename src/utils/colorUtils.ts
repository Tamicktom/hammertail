//* Librarie imports
import Vibrant from "node-vibrant";

//* Types
export type RGB = `rgb(${number},${number},${number})`;
export type RGBA = `rgba(${number},${number},${number},${number})`;

/**
 * Get the RGB pallette from an image
 * @param url The url of the image
 * @returns The RGB pallette
 */
export async function getRGBPalletteFromImage(url: string) {
  let rgb: [number, number, number] = [0, 0, 0];
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
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export function arrayToRGBString(array: [number, number, number]): RGB {
  return `rgb(${array[0]},${array[1]},${array[2]})` as RGB;
}

export function arrayToRGBAString(
  array: [number, number, number, number]
): string {
  return `rgba(${array[0]},${array[1]},${array[2]},${array[3]})` as RGBA;
}
