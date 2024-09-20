import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Culture {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}