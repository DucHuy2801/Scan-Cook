import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'recipe' })
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    image: string;
}