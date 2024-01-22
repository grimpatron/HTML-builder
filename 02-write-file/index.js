const fs = require('fs');  // Импорт модуля 'fs' (file system)
const readline = require('readline');  // Импорт модуля 'readline'
const folderPath = '02-write-file';  // Путь к папке

// Создание интерфейса для чтения ввода пользователя
const consl = readline.createInterface({
  input: process.stdin,  // Ввод из стандартного потока ввода
  output: process.stdout  // Вывод в стандартный поток вывода
});

// Функция для задания вопроса пользователю
const promptForInput = () => {
  consl.question('Enter text: ', (text) => {  // Задаем вопрос
    // Добавляем текст, введенный пользователем, в файл 'text.txt'
    fs.appendFile(`${folderPath}/text.txt`, text + '\n', (err) => {
      if (err) throw err;  // Если произошла ошибка, выбрасываем исключение
      console.log('Text was added to the file!');
      promptForInput();  // Задаем вопрос снова после записи текста
    });
  });
};

promptForInput();

// Обработчик события завершающий процесс 'SIGINT' (Ctrl+C)
consl.on('SIGINT', () => {
  console.log('\nProcess completed.');
  process.exit(0);  // Завершаем процесс (кодом 0 - успешное завершение)
});
