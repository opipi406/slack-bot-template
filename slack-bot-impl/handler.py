# slack-bot-impl/app.py
import os
import json
import boto3
from slack_bolt import App
from slack_bolt.adapter.aws_lambda import SlackRequestHandler

# Initialize AWS Secrets Manager client
secretsmanager = boto3.client('secretsmanager')

# Get secrets from AWS Secrets Manager
def get_secrets():
    secret_arn = os.environ['SLACK_SECRET_ARN']
    response = secretsmanager.get_secret_value(SecretId=secret_arn)
    secrets = json.loads(response['SecretString'])
    return secrets

# Get secrets
secrets = get_secrets()

# Initialize the Slack app
app = App(
    token=secrets['SLACK_BOT_TOKEN'],
    signing_secret=secrets['SLACK_SIGNING_SECRET']
)

# Example command handler
@app.command("/hello")
def hello_command(ack, body):
    user_id = body["user_id"]
    ack(f"Hello, <@{user_id}>!")

# Example message handler
@app.message("hello")
def message_hello(message, say):
    say(f"Hey there <@{message['user']}> :wave:")

# Lambda handler
def handler(event, context):
    slack_handler = SlackRequestHandler(app=app)
    return slack_handler.handle(event, context)
