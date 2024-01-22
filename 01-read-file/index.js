const fs = require('fs');  // Импорт модуля 'fs' (file system)
const folderPath = '01-read-file';  // Путь к папке

// Создание потока чтения из файла 'text.txt'
const readStream = fs.createReadStream(`${folderPath}/text.txt`, { encoding: 'utf8' });

// Обработчик события 'data' для вывода данных в консоль
readStream.on('data', (message) => console.log(message));
