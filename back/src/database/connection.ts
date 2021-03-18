import {Sequelize} from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, IN_TEST, DB_NAME} = process.env;

const sequelize = new Sequelize({
  dialect: IN_TEST? 'sqlite': 'postgres',
  username: DB_USER || '',
  password: DB_PASSWORD || '',
  host: DB_HOST || 'null',
  port: Number(DB_PORT) || 0,
  database:IN_TEST? 'test': DB_NAME,
  storage: path.resolve(__dirname,'..', '..', '__tests__','database', 'database.test.sqlite'),
  logging: false,
});

export default sequelize;
