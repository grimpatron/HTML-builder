const fs = require('fs').promises; // Импорт модуля 'fs' (file system)
const path = require('path'); // Импорт модуля 'path' (paths to filess)
const folderPath = './04-copy-directory'; // Путь к папке

async function copyDir(src, dest) {
    // Создаём конечную папку, если она еще не существует
    try {
        await fs.mkdir(dest, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }

    // Читаем содержимое исходной папки.
    let entries = await fs.readdir(src, { withFileTypes: true });
    for (let entry of entries) {

        // Пути к папкам.
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            // Если элемент - папкой, рекурсивно копируем содержимое.
            await copyDir(srcPath, destPath);
        } else {
            // Если элемент - файл, копируем файл.
            await fs.copyFile(srcPath, destPath);
        }
    }
}

copyDir(`${folderPath}/files`, `${folderPath}/copying-files`).catch(console.error);

