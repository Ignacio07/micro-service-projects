import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Proyect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
}