import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from 'typeorm';
import { Task } from './task.entity';
@Entity('priorities')
export class Priority extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @OneToMany(() => Task, (task) => task.priority)
  tasks!: Task[];
}
