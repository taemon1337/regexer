#!/bin/bash

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
app=$dir/../app

url=${1:-http://127.0.0.1:8080/api/patterns}
resource=$(basename $url)
outfile=${2:-$app/src/assets/$resource.json}
echo "Download $resource from $url..."

if $(command -v json_pp >/dev/null 2>&1); then
  curl -k -X GET $url | json_pp > $outfile
elif $(command -v python >/dev/null 2>&1); then
  curl -k -X GET $url | python -mjson.tool > $outfile
else
  curl -k -X GET $url > $outfile
fi
