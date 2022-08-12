import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personnel_number: number;

  @Column()
  department: number;

  @Column()
  job_title: number;

  @Column()
  last_name: string;

  @Column()
  first_name: string;

  @Column()
  patronymic: string;

  @Column()
  advanced: string;

  @Column({ default: true })
  isActive: boolean;
}
