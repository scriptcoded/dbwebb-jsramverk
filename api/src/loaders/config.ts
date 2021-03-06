import Container, { Token } from 'typedi'

export interface Config {
  port: string;

  appKeys: string[];

  appURL: string;

  databaseURL: string;
  redisURL?: string;

  sendgrid: {
    apiKey: string;
    from: string;
    inviteTemplate: string;
  };

  isProduction: boolean;
}

export const CONFIG_TOKEN = new Token<Config>('CONFIG')

/**
 * Retrieves an env var. Will throw for non-existent env vars unless a fallback
 * is provided
 * @param name Name of the environment variable
 * @param fallback Fallback value for the environment variable
 * @returns The value of the environment variable
 */
function getEnvVar <T = string> (name: string, fallback?: T) {
  const value = process.env[name]

  if (!value) {
    if (fallback !== undefined) {
      return fallback
    }

    throw new Error(`Missing environment variable ${name}`)
  }

  return value
}

export function loadConfig (): void {
  const config: Config = {
    port: getEnvVar('PORT', '4000'),

    appKeys: getEnvVar('APP_KEYS').split(','),

    appURL: getEnvVar('APP_URL').replace(/\/$/, ''),

    databaseURL: getEnvVar('DATABASE_URL'),
    redisURL: getEnvVar('REDIS_URL', null) ?? undefined,

    sendgrid: {
      apiKey: getEnvVar('SENDGRID_API_KEY'),
      from: getEnvVar('SENDGRID_FROM'),
      inviteTemplate: getEnvVar('SENDGRID_INVITE_TEMPLATE')
    },

    isProduction: process.env.NODE_ENV === 'production'
  }

  Container.set(CONFIG_TOKEN, config)
}
