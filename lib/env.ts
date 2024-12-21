function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
}

export const env = {
  DATABASE_URL: getEnvVar('DATABASE_URL'),
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const;