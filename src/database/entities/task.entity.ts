import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!  : number ;
    @Column()
    title!: string;
    @Column()
    description!: string;
    @Column()
    completed!: boolean;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
}