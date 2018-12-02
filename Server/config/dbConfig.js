import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
  "development": {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    port: '5432',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    max: 10
  },
  "test": {
    user: process.env.DATABASE_TEST_USER,
    database: process.env.DATABASE_TEST_NAME,
    password: process.env.DATABASE_TEST_PASSWORD,
    host: process.env.DATABASE_TEST_HOST,
    port: '5432'
},
  "production": {
    user: process.env.DATABASE_PRODUCTION_USER,
    database: process.env.DATABASE_PRODUCTION_NAME,
    password: process.env.DATABASE_PRODUCTION_PASSWORD,
    host: process.env.DATABASE_PRODUCTION_HOST,
    port: '5432'
  }

};
export default databaseConfig;
