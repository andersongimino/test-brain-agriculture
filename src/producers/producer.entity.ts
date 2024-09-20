import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { Culture } from '../cultures/culture.entity';

@Entity()
export class Producer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    cpfCnpj: string;

    @Column()
    nameProducer: string;

    @Column()
    nameFarm: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column('decimal')
    totalArea: number;

    @Column('decimal')
    arableArea: number;

    @Column('decimal')
    vegetationArea: number;

    @ManyToMany(() => Culture)
    @JoinTable()
    cultures: Culture[];
}