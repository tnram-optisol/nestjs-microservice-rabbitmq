import { MigrationInterface, QueryRunner } from 'typeorm';

export class roleMigration1676466822467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            db.role.insertMany([{name:'super admin'},{name:'seller'},{name:'user'}])
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            db.role.drop()
        `);
  }
}
