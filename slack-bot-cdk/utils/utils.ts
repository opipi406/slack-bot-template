import { pascalCase } from 'change-case'

import { EnvironmentConfig } from './environment'

const config = EnvironmentConfig.getInstance()

export class Utils {
  private config = EnvironmentConfig.getInstance()

  public getResourceName(baseName: string): string {
    return pascalCase(`${config.prefix}-${baseName}`) + `-${config.envName}`
  }

  public getLambdaResourceName(baseName: string): string {
    return this.getResourceName(`${baseName}-handler`)
  }
}
