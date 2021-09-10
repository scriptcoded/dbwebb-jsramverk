import Container, { Token } from 'typedi'

export interface Config {
  port: string;

  databaseURL: string;
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
    port: getEnvVar('PORT'),

    databaseURL: getEnvVar('DATABASE_URL')
  }

  Container.set(CONFIG_TOKEN, config)
}
