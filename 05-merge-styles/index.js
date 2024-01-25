const fs = require('fs').promises; // Импорт модуля 'fs' (file system)
const path = require('path'); // Импорт модуля 'path' (paths to filess)

const stylesDir = path.join(__dirname, 'styles');       // stylesDir - откуда берем стили.
const distDir = path.join(__dirname, 'project-dist');   // distDir - куда bundle.css. складываем.
const outputFile = path.join(distDir, 'bundle.css');    // outputFile - путь к файлу bundle.css.

async function readAndCombineFiles() {
  await fs.mkdir(distDir, { recursive: true }); // Создаем 'project-dist', если она не существует

  const files = await fs.readdir(stylesDir); // Читаем все файлы из папки styles
  const cssFiles = files.filter(file => path.extname(file) === '.css'); // Фильтруем файлы, оставляем только .css
  const styles = await Promise.all(cssFiles.map(file => fs.readFile(path.join(stylesDir, file), 'utf8'))); // Читаем содержимое каждого .css файла и объединяем их в одну строку

  await fs.writeFile(outputFile, styles.join('\n'));   // Записываем полученную строку в файл bundle.css
}

readAndCombineFiles().catch(console.error);