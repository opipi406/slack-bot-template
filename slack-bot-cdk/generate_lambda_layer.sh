#!/bin/bash

mkdir -p lambda_layer/python

# poetry lock

cd ../slack-bot-impl || exit

poetry export -f requirements.txt --output requirements.txt --without-hashes

source $(poetry env info --path)/bin/activate

pip install -r requirements.txt -t ../slack-bot-cdk/lambda_layer/python

# 不要なファイルを削除
rm requirements.txt

echo "Lambda layer directory 'lambda_layer' has been created successfully."
