const readEnv = (key, fallback) => {
  const variable = process.env[key] || fallback;

  if (variable === undefined) {
    console.error(`Cannot proceed without ${key} variable`);
    process.exit(1);
  }

  return variable;
};

export const NODE_ENV = readEnv('NODE_ENV', 'development');
export const APP_ORIGIN = readEnv('APP_ORIGIN');
export const ATLAS_URI = readEnv('ATLAS_URI');
export const PORT = readEnv('PORT', '5050');
export const JWT_SECRET = readEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = readEnv('JWT_REFRESH_SECRET');
export const RESEND_API_KEY = readEnv('RESEND_API_KEY');
export const EMAIL_FROM = readEnv('EMAIL_FROM');
