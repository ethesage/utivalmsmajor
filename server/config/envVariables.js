import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  NODE_ENV,
  DATABASE_URL,
  TEST_DATABASE_URL,
  API_SECRET,
  API_KEY,
  ENCRYPTION_SECRET,
  AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_BUCKET_NAME,
} = process.env;
