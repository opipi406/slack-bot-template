interface ConfigProps {
  readonly envName: string
}

export type Environment = 'develop' | 'stage' | 'production'

// 環境ごとの設定
const environments: { [K in Environment]: ConfigProps } = {
  develop: {
    envName: 'develop',
  },
  stage: {
    envName: 'stage',
  },
  production: {
    envName: 'production',
  },
}

export class EnvironmentConfig {
  private static instance: EnvironmentConfig
  private config: ConfigProps
  readonly env: Environment

  private constructor() {
    let env = process.env.ENVIRONMENT

    if (!env) {
      throw new Error('ENVIRONMENT environment variable is not set')
    }

    if (env === 'dev') {
      env = 'develop'
    }
    if (env === 'prod') {
      env = 'production'
    }
    if (env === 'stg' || env === 'staging') {
      env = 'stage'
    }

    if (!(env in environments)) {
      throw new Error(`Invalid environment: ${env}`)
    }

    if (!process.env.ACCOUNT_ID) {
      throw new Error('ACCOUNT_ID environment variable is not set')
    }

    if (!process.env.AWS_DEFAULT_REGION) {
      throw new Error('AWS_DEFAULT_REGION environment variable is not set')
    }

    if (!process.env.PROJECT_NAME) {
      throw new Error('PROJECT_NAME environment variable is not set')
    }

    this.env = env as Environment
    this.config = environments[env as Environment]
  }

  static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig()
    }
    return EnvironmentConfig.instance
  }

  get envName(): string {
    return this.config.envName
  }

  get isDevelop(): boolean {
    return this.env === 'develop'
  }

  get isStage(): boolean {
    return this.env === 'stage'
  }

  get isProduction(): boolean {
    return this.env === 'production'
  }

  get accountId(): string {
    return process.env.ACCOUNT_ID!
  }

  get region(): string {
    return process.env.AWS_DEFAULT_REGION!
  }

  get prefix(): string {
    return process.env.PROJECT_NAME!
  }
}
