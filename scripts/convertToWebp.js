import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertToWebp(directory) {
  try {
    const files = await fs.readdir(directory);
    
    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = await fs.stat(filePath);
      
      if (stats.isDirectory()) {
        await convertToWebp(filePath);
        continue;
      }
      
      const ext = path.extname(file).toLowerCase();
      const supportedFormats = ['.jpg', '.jpeg', '.png'];
      
      if (supportedFormats.includes(ext)) {
        const outputPath = path.join(
          directory,
          `${path.basename(file, ext)}.webp`
        );
        
        console.log(`Converting ${file} to WebP...`);
        
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Created ${path.basename(outputPath)}`);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Convertir imágenes en el directorio assets
const assetsDir = path.join(__dirname, '..', 'src', 'assets');
convertToWebp(assetsDir);
