import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../utils/environment';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SlackBotCdkStack extends cdk.Stack {
  readonly config = EnvironmentConfig.getInstance();

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'SlackBotCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
