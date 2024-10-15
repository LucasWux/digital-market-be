import * as dotenv from 'dotenv';
import * as Joi from 'joi';
dotenv.config();

export const isLocal = process.env.NODE_ENV === 'local';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test', 'local')
      .required(),
    PORT: Joi.number().default(3000),

    MYSQL_HOST: Joi.string().default('localhost'),
    MYSQL_PORT: Joi.number().default(3306),
    MYSQL_USER: Joi.string().default('root').required(),
    MYSQL_PASSWORD: Joi.string().required(),
    MYSQL_DATABASE_NAME: Joi.string().required(),

    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().default(''),
    REDIS_DB: Joi.number().default(0),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error != null) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
    user: envVars.MYSQL_USER,
    password: envVars.MYSQL_PASSWORD,
    dbName: envVars.MYSQL_DATABASE_NAME,
    testDbName: 'test',
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
    db: envVars.REDIS_DB,
  },
};
