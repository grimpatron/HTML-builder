const fs = require('fs'); // Импорт модуля 'fs' (file system)
const path = require('path'); // Импорт модуля 'path' (paths to filess)

const stylesDir = path.join(__dirname, 'styles');       // stylesDir - путь к папке со стилями.
const distDir = path.join(__dirname, 'project-dist');   // distDir - путь к папке, куда сохраняем bundle.css.
const outputFile = path.join(distDir, 'bundle.css');    // outputFile - путь к файлу bundle.css.

// Затем мы считываем все файлы из папки styles, которые имеют расширение .css, и записываем их содержимое в массив styles.
// Далее мы записываем содержимое массива styles в файл bundle.css в папке project-dist.
// В общем, этот код собирает все CSS-стили из папки styles в один файл bundle.css в папке project-dist.
const styles = fs.readdirSync(stylesDir)
  .filter(file => path.extname(file) === '.css')
  .map(file => fs.readFileSync(path.join(stylesDir, file), 'utf8'));

fs.writeFileSync(outputFile, styles.join('\n'));