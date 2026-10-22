import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function zipDirectory(zip: JSZip, folderPath: string, rootDir: string) {
  const items = fs.readdirSync(folderPath);

  for (const item of items) {
    // Ignore node_modules, dist, .git, .aistudio, and zip files
    if (
      item === 'node_modules' ||
      item === 'dist' ||
      item === '.git' ||
      item === '.aistudio' ||
      item.endsWith('.zip')
    ) {
      continue;
    }

    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);
    const relativePath = path.relative(rootDir, fullPath).replace(/\\/g, '/');

    if (stat.isDirectory()) {
      zip.folder(relativePath);
      await zipDirectory(zip, fullPath, rootDir);
    } else {
      const content = fs.readFileSync(fullPath);
      zip.file(relativePath, content);
    }
  }
}

async function main() {
  console.log('Generating Aether Browser ZIP package...');
  const zip = new JSZip();
  const rootDir = process.cwd();

  // Specifically include android directory and key project files
  console.log('Packaging Android project & configuration files...');
  await zipDirectory(zip, path.join(rootDir, 'android'), rootDir);

  // Add individual files
  const rootFiles = [
    'APK-CONVERT-GUIDE.md',
    'capacitor.config.json',
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    '.env.example'
  ];

  for (const file of rootFiles) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      zip.file(file, fs.readFileSync(filePath));
    }
  }

  // Include src files
  if (fs.existsSync(path.join(rootDir, 'src'))) {
    await zipDirectory(zip, path.join(rootDir, 'src'), rootDir);
  }

  // Include public non-zip files
  if (fs.existsSync(path.join(rootDir, 'public'))) {
    await zipDirectory(zip, path.join(rootDir, 'public'), rootDir);
  }

  console.log('Compressing ZIP archive...');
  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const zipPath1 = path.join(publicDir, 'aether-browser-project.zip');
  const zipPath2 = path.join(publicDir, 'aether-browser-app.zip');

  fs.writeFileSync(zipPath1, content);
  fs.writeFileSync(zipPath2, content);

  console.log(`Successfully created ZIP archive:`);
  console.log(`- ${zipPath1} (${(content.length / 1024 / 1024).toFixed(2)} MB)`);
  console.log(`- ${zipPath2} (${(content.length / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch(err => {
  console.error('Failed to create zip:', err);
  process.exit(1);
});
