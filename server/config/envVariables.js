import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  TEST_DATABASE_URL,
  CLOUD_NAME,
  API_SECRET,
  API_KEY,
  ENCRYPTION_SECRET,
} = process.env;
