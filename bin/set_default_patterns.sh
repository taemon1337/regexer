#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
app=$dir/../app

url=${1:-http://127.0.0.1:8080/api/patterns}
echo "Download patterns from $url..."

if $(command -v json_pp >/dev/null 2>&1); then
  curl -k -X GET $url | json_pp > $app/src/assets/patterns.json
elif $(command -v python >/dev/null 2>&1); then
  curl -k -X GET $url | python -mjson.tool > $app/src/assets/patterns.json
else
  curl -k -X GET $url > $app/src/assets/patterns.json
fi
