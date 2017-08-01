#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
app=$dir/../app

url=${1:-http://127.0.0.1:8080/api/patterns}
resource=$(basename $url)
jsonfile=${2:-$app/src/assets/$resource.json}
echo "Seeding database $resource from $jsonfile..."

curl -k -H "Content-Type: application/json" -X POST -d "@$jsonfile" $url
