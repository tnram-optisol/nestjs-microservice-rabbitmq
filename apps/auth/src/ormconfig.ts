import { DataSource } from 'typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { Role } from './database/entities/role.entity';
import { User } from './database/entities/user.entity';
import { rolesData1676529367929 } from './migration/1676529367929-roles-data';

/**
 * For Orm config
 */

export const config: MongoConnectionOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017',
  database: 'nestjs-mongo-sample',
  entities: [User, Role],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  migrations: [rolesData1676529367929],
  synchronize: false,
  logging: true,
};

/**
 * For Migrations
 */

export const dataSource = new DataSource(config);
