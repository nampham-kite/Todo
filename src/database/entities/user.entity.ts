import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  @Unique(['username'])
  username!: string;
  @Column()
  password!: string;
  @Column({
    nullable: true,
  })
  email!: string;
  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
