#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { pascalCase } from 'change-case'

import { SlackBotCdkStack } from '../lib/slack-bot-cdk-stack'
import { EnvironmentConfig } from '../utils/environment'

const app = new cdk.App()
const config = EnvironmentConfig.getInstance()

new SlackBotCdkStack(app, pascalCase(`${config.prefix}Stack`) + `-${config.envName}`, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  env: { account: process.env.ACCOUNT_ID, region: process.env.AWS_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
})
