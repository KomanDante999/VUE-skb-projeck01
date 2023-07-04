#!/usr/bin/env sh

# остановить сборку при ошибках
set -e

# сорка
npm run build

cd dist

git init
git add -A 
git commit -m 'deploy'

git push -f https://github.com/KomanDante999/vue-tehnozavr.git master:gh-pages

cd -