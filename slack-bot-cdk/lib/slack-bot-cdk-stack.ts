import * as path from 'path'

import * as cdk from 'aws-cdk-lib'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs'

import { Utils } from '../utils/utils'

export class SlackBotCdkStack extends cdk.Stack {
  private utils = new Utils()

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // const scheduleBotLayer = new lambda.LayerVersion(this, 'scheduleBotLayer', {
    //   code: lambda.AssetCode.fromAsset('lambda_layer'),
    //   compatibleRuntimes: [lambda.Runtime.PYTHON_3_10],
    // })

    const slackBotFunction = new lambda.Function(
      this,
      this.utils.getLambdaResourceName('SlackBot'),
      {
        runtime: lambda.Runtime.PYTHON_3_12,
        handler: 'app.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, '../../slack-bot-impl')),
        timeout: cdk.Duration.seconds(30),
        environment: {
          SLACK_SIGNING_SECRET: 'example-signing-secret',
          SLACK_BOT_TOKEN: 'example-bot-token',
          TZ: 'Asia/Tokyo',
        },
      },
    )

    new apigateway.LambdaRestApi(this, this.utils.getResourceName('SlackBotApi'), {
      handler: slackBotFunction,
    })
  }
}
