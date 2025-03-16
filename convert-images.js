import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, parse } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, 'src', 'assets');

try {
  // Leer todos los archivos del directorio
  const files = await readdir(assetsDir);

  // Filtrar solo archivos de imagen
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  // Convertir cada imagen a webp
  for (const file of imageFiles) {
    const inputPath = join(assetsDir, file);
    const outputPath = join(assetsDir, `${parse(file).name}.webp`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 }) // 80% de calidad para un buen balance
        .toFile(outputPath);
      console.log(`Convertida: ${file} -> ${parse(file).name}.webp`);
    } catch (err) {
      console.error(`Error al convertir ${file}:`, err);
    }
  }
} catch (err) {
  console.error('Error al leer el directorio:', err);
}
