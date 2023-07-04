const { execSync } = require('child_process')
try {
  // Останавливаем сборку при ошибках
  // execSync('set -e');

  // Собираем проект
  execSync('npm run build');

  // Переходим в папку dist
  execSync('cd dist');

  // Инициализируем Git репозиторий
  execSync('git init');

  // Добавляем все файлы в коммит
  execSync('git add -A');

  // Создаем коммит
  execSync('git commit -m "deploy"');

  // Публикуем проект на gh-pages
  execSync('git push -f https://github.com/KomanDante999/vue-tehnozavr.git HEAD:gh-pages');

  // Возвращаемся в исходную папку
  execSync('cd -');
} catch (error) {
  console.error(`Ошибка при выполнении развертывания: ${error}`);
  process.exit(1);
}