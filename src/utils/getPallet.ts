// credits to https://github.com/FxOmar for this code
// i couldnt find a way to import it so i just copied it here and update some stuff

// @ts-ignore
import * as quantize_ from "quantize";

const quantize = quantize_;

/**
 * Image Color palette generator.
 *
 * @param {string} imagePath
 */
export default class colorPirate {
  protected imageURL: string;

  constructor(imageURL: string) {
    this.imageURL = imageURL;
  }

  /**
   * Load image from the URL.
   *
   * @param {string} imageURL Image URL.
   *
   * @returns {Promise<HTMLImageElement>}
   **/
  private loadImage(imageURL: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not load image"));
      image.src = imageURL;
    });
  }

  /**
   * Create an image canvas from the image URL.
   *
   * @returns {ImageData}
   *
   * @memberof ImageColorPicker
   *
   * @throws {Error} If the image could not be loaded.
   **/
  private async createImageCanvas(): Promise<ImageData | null> {
    const imageData: HTMLImageElement = await this.loadImage(this.imageURL);

    if (imageData) {
      const canvas = document.createElement("canvas");

      const ctx = canvas.getContext("2d");

      canvas.width = imageData.width;
      canvas.height = imageData.height;

      if (ctx) {
        ctx.drawImage(imageData, 0, 0);
        return ctx.getImageData(0, 0, imageData.width, imageData.height);
      }
    }
    throw new Error("Could not create image canvas.");
  }

  /**
   * Get the image data from the image.
   *
   * @param {ImageData} imageData
   * @param {number} pixelCount
   * @param {number} quality
   *
   * @returns {Array<Number[]>}
   **/
  private createPixelArray(
    imageData: Uint8ClampedArray,
    pixelCount: number,
    quality: number
  ) {
    const pixelArray = new Array().fill(0);

    // Loop through pixels and add it to the array.
    for (let i = 0; i < pixelCount; i += quality) {
      // Get the pixel data.
      const pixel = imageData.slice(i * 4, (i + 1) * 4);

      // If pixel is mostly opaque and not white
      if (typeof pixel[3] === "undefined" || pixel[3] >= 125) {
        //@ts-ignore
        if (!(pixel[0] > 250 && pixel[1] > 250 && pixel[2] > 250)) {
          pixelArray[pixelArray.length] = pixel;
        }
      }
    }

    return pixelArray;
  }

  /**
   * Get image pixels data.
   *
   * @param {number} quality Quality of colors to return.
   *
   * @returns {Promise<Array<Number[]>>} Array of pixels data.
   *
   * @memberof ImageColorPicker
   *
   * @throws {Error} If the image could not be loaded.
   **/
  private async getImageData(quality: number): Promise<Array<Number[]> | null> {
    const imageCanvas = await this.createImageCanvas();

    if (imageCanvas) {
      return this.createPixelArray(
        imageCanvas.data,
        imageCanvas.width * imageCanvas.height,
        quality
      );
    }

    throw new Error("Could not create image data.");
  }

  /**
   * Generate a color palette from the image.
   *
   * @param {number} quality Quality of colors to return.
   * @param paletteSize Number of colors to be used in the quantization
   * @returns {Promise<Array<Number[]>>}
   *
   * @memberof ImageColorPicker
   *
   * @example new ImageColorPicker().getPalette("https://example.com/image.jpg", 2, 20);
   **/
  public async getPalette(
    paletteSize: number = 6,
    quality: number = 20
  ): Promise<Array<number[]> | undefined> {
    if (paletteSize <= 1) {
      throw new Error("Palette size must be greater than 1.");
    }

    try {
      let data = await this.getImageData(quality);

      if (data) {
        const palette = quantize(data, paletteSize);

        const paletteColors = palette.palette();

        return paletteColors;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Could not create palette. Something went wrong.");
    }
  }

  public async getRGBPalletColors(
    palletSize: number = 6,
    quality: number = 20
  ): Promise<string[] | undefined> {
    const pallet = await this.getPalette(palletSize, quality);

    if (pallet) {
      return pallet.map((color) => {
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      });
    }
  }

  public RGBToHSL = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };

  /**
   * Get the dominant color from the image.
   *
   * @param {number} quality Quality of colors to return.
   *
   * @returns {Promise<Array<Number>>}
   *
   * @memberof ImageColorPicker
   *
   * @example new ImageColorPicker("https://example.com/image.jpg").getColor();
   *
   * @throws {Error} If the image could not be loaded.
   **/
  public async getColor(
    quality: number = 20
  ): Promise<Array<Number> | undefined> {
    try {
      const paletteColors = await this.getPalette(3, quality);

      // check paletteColors is an array.
      if (Array.isArray(paletteColors)) {
        const dominantColor = paletteColors[0];

        return dominantColor;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Could not create palette. Something went wrong.");
    }
  }
}
