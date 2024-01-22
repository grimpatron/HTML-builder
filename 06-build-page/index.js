const fs = require('fs').promises;
const path = require('path');

// Асинхронная функция для сборки страницы
async function buildPage() {
    const templatePath = path.join(__dirname, 'template.html');
    const componentsPath = path.join(__dirname, 'components');
    const stylesPath = path.join(__dirname, 'styles');
    const assetsPath = path.join(__dirname, 'assets');
    const projectDistPath = path.join(__dirname, 'project-dist');

    
    await fs.mkdir(projectDistPath, { recursive: true }); // Создание директории project-dist
    let template = await fs.readFile(templatePath, 'utf-8'); // Чтение файла шаблона
    const componentFiles = await fs.readdir(componentsPath); // Замена тегов шаблона содержимым компонентов
    for (const file of componentFiles) {
        if (path.extname(file) === '.html') {
            const componentName = path.basename(file, '.html');
            const componentContent = await fs.readFile(path.join(componentsPath, file), 'utf-8');
            const regExp = new RegExp(`{{${componentName}}}`, 'g');
            template = template.replace(regExp, componentContent);
        }
    }


    // Запись измененного шаблона в файл index.html в папке project-dist
    await fs.writeFile(path.join(projectDistPath, 'index.html'), template);


    // Компиляция стилей в один файл
    let styleDist = '';
    const styleFiles = await fs.readdir(stylesPath);
    for (const file of styleFiles) {
        if (path.extname(file) === '.css') {
            styleDist += await fs.readFile(path.join(stylesPath, file), 'utf-8');
        }
    }
    await fs.writeFile(path.join(projectDistPath, 'style.css'), styleDist);


    // Копирование папки assets в project-dist
    // await fs.copyFile(assetsPath, path.join(projectDistPath, 'assets'));

    copyDir(assetsPath, path.join(projectDistPath, 'assets'));
}

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

        let srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath); // Если элемент - папкой, рекурсивно копируем содержимое.
        } else {
            await fs.copyFile(srcPath, destPath); // Если элемент - файл, копируем файл.
        }
    }
}


// Вызов функции сборки страницы и обработка возможных ошибок
buildPage().catch(console.error);