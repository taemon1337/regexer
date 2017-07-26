#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
docs=$dir/../docs
app=$dir/../app
user=`whoami`

build_image=regexer:build
echo "building $build_image..."
docker build -t $build_image $dir/../app

echo "building production app..."
docker run --rm -w /app -v $dir/../app:/app $build_image npm run build

echo "fixing relative path font awesome import issue..."
sed -i '' 's/url(static\/fonts/url(..\/fonts/g' $app/dist/static/css/app.*.css

# remove sed auto backup files
rm $app/dist/static/css/app.*.css.bak

echo "complete."



