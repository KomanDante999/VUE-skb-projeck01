const { execSync } = require('child_process');
const path = require('path');

try {
  // Собираем проект
  execSync('npm run build');

  // Получаем абсолютный путь до директории dist
  const absolutePath = path.resolve(__dirname, 'dist');

  // Инициализируем Git репозиторий
  execSync('git init', { cwd: absolutePath });

  // Добавляем все файлы в коммит
  execSync('git add -A', { cwd: absolutePath });

  // Создаем коммит
  execSync('git commit -m "deploy"', { cwd: absolutePath });

  // Force push на ветку gh-pages, а не на master
  execSync('git push -f https://github.com/KomanDante999/vue-tehnozavr.git HEAD:gh-pages', { cwd: absolutePath });

  console.log("Развертывание завершено успешно.");
} catch (error) {
  console.error(`Ошибка при выполнении развертывания: ${error}`);
  process.exit(1);
}