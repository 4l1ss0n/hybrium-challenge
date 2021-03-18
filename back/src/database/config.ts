const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, IN_TEST, DB_NAME} = process.env;

module.exports = {
  dialect: IN_TEST? 'sqlite': 'postgres',
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  database:IN_TEST? 'test': DB_NAME,
  storage: path.resolve(__dirname,'..', '..', '__tests__','database', 'database.test.sqlite'),
  logging: false,
};