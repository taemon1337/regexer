#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "compiling app for production..."
$dir/build_prod.sh

api_image=registry.swarm/regexer_api
app_image=registry.swarm/regexer
version=latest

echo "building production image..."
docker build -t $app_image:$version -f $dir/../app/Dockerfile.production $dir/../app

echo "building api image..."
docker build -t $api_image:$version $dir/../api

echo "pushing images to registry..."
docker push $api_image:$version
docker push $app_image:$version

echo "complete."



