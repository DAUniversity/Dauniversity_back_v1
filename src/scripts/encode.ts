
import { promises as fs } from 'fs';
import { PNG } from 'pngjs';
import path from 'path';
import { PngImage } from '../models/images/types';
import { PNGCollectionEncoder } from '../models/images/png-collection-encoder';

const DESTINATION = path.join(__dirname, '../assets/image-data.json');

/**
 * Read a PNG image file and return a `PngImage` object.
 * @param path The path to the PNG file
 */
const readPngImage = async (path: string): Promise<PngImage> => {
  const buffer = await fs.readFile(path);
  const png = PNG.sync.read(buffer);

  return {
    width: png.width,
    height: png.height,
    rgbaAt: (x: number, y: number) => {
      const idx = (png.width * y + x) << 2;
      const [r, g, b, a] = [png.data[idx], png.data[idx + 1], png.data[idx + 2], png.data[idx + 3]];
      return {
        r,
        g,
        b,
        a,
      };
    },
  };
};

const encode = async () => {
  const encoder = new PNGCollectionEncoder();

  const partfolders = ['2-accessories', '0-backgrounds', '1-bodies', '4-glasses', '5-hats', '3-heads'];
  for (const folder of partfolders) {
    console.log('Convirtiendo imagenes de: ' + folder)
    const folderpath = path.join(__dirname, '../assets/images', folder);
    const files = await fs.readdir(folderpath);
    for (const file of files) {
      const image = await readPngImage(path.join(folderpath, file));
      encoder.encodeImage(file.replace(/\.png$/, ''), image, folder.replace(/^\d-/, ''));
    }
  }
  await fs.writeFile(
    DESTINATION,
    JSON.stringify(
      {
        bgColors: ['d5d7e1', 'e1d7d5'],
        ...encoder.data,
      },
      null,
      2,
    ),
  );
};

encode();
