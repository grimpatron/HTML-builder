const fs = require('fs').promises;
const path = require('path');
const folderPath = './04-copy-directory';


async function clearDir(dir) {
    let entries = await fs.readdir(dir, { withFileTypes: true });    // Читаем содержимое

    // Проходим по каждому элементу
    for (let entry of entries) {
        let entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await fs.rmdir(entryPath, { recursive: true }); // Если это директория, удаляем ее
        } else {
            await fs.unlink(entryPath); // удаляем файл
        }
    }
}


async function copyDir(src, dest) {
    // Создаем директорию, если не существует
    try {
        await fs.mkdir(dest, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }

    // Читаем содержимое исходной директории
    let entries = await fs.readdir(src, { withFileTypes: true });

    // Проходим по каждому элементу
    for (let entry of entries) {
        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);         // Если это , копируем директорию
        } else {
            await fs.copyFile(srcPath, destPath);        //  копируем файл
        }
    }
}

clearDir(`${folderPath}/files-copy`);
copyDir(`${folderPath}/files`, `${folderPath}/files-copy`).catch(console.error);
