#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

build_image=regexer:build
echo "building $build_image..."
docker build -t $build_image $dir/../app

echo "building production app..."
docker run --rm -w /app -v $dir/../app:/app $build_image npm run build

echo "fixing permissions..."
sudo chown -R $USER. $dir/../app/dist

echo "moving dist to docs/"
rm -rf $dir/../docs
mv $dir/../app/dist $dir/../docs

echo "complete."



