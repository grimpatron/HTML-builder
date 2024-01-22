const fs = require('fs'); // Импорт модуля 'fs' (file system)
const path = require('path'); // Импорт модуля 'path' (paths to filess)
const folderPath = './03-files-in-folder/secret-folder'; // Путь к папке

// Чтение содержимого каталога.
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Ошибка чтения каталога:', err); // Вывод ошибки, если чтение каталога не удалось.
    return;
  }

  // Обработка каждого файла в каталоге.
  files.forEach(file => {
    const filePath = path.join(folderPath, file); // Создание полного пути к файлу.

    // Получение информации о файле.
    fs.stat(filePath, (err, el) => {
      if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
      }

      // Если это файл, выводим его имя, расширение и размер.
      if (el.isFile()) {
        const { name, ext } = path.parse(file); // Разбор имени файла и его расширения.
        const fileSize = el.size; // Размер файла в байтах.
        console.log(`${name} - ${ext.slice(1)} - ${fileSize}b`); // Информации о файле.
      }
    });
  });
});


