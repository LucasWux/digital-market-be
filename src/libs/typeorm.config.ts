import { join } from 'path';
import { env } from 'src/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: env.mysql.host,
  port: env.mysql.port,
  username: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.dbName,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: false,
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
});

export default dataSource;
