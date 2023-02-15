import { DataSource, DataSourceOptions } from 'typeorm';
import { Role } from './database/entities/role.entity';
import { User } from './database/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/**
 * For Orm config
 */
export const config: DataSourceOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  database: 'nestjs-mongo-sample',
  entities: [User, Role],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  migrationsRun: true,
  migrationsTableName: 'mongo_migrations',
  migrations: [__dirname + 'apps/auth/src/database/migrations/*.ts'],
  synchronize: false,
};

/**
 * For Migrations
 */

export const dataSource = new DataSource(config);
