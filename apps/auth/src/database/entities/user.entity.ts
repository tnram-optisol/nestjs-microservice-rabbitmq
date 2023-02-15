import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'user' })
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string' })
  email: string;

  @Column({ type: 'string' })
  password: string;

  @Column({ type: 'string', nullable: true })
  profilePic: string;

  @Column(() => Role)
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
