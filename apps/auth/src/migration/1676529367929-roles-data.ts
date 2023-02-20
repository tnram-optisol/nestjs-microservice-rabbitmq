import { MigrationInterface } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';
import { Role } from '../database/entities/role.entity';

export class rolesData1676529367929 implements MigrationInterface {
  public async up(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.insertMany('role', [
      { role_name: 'super_admin' },
      { role_name: 'seller' },
      { role_name: 'buyer' },
    ]);
  }

  public async down(queryRunner: MongoQueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
