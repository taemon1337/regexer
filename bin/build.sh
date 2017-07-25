#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

build_image=regexer:build
api_image=registry.swarm/regexer_api
app_image=registry.swarm/regexer
version=latest

echo "building $build_image..."
docker build -t $build_image $dir/../app

echo "building production app..."
docker run --rm -w /app -v $dir/../app:/app $build_image npm run build

echo "building production image..."
docker build -t $app_image:$version -f $dir/../app/Dockerfile.production $dir/../app

echo "building api image..."
docker build -t $api_image:$version $dir/../api

echo "pushing images to registry..."
docker push $api_image:$version
docker push $app_image:$version

echo "complete."



