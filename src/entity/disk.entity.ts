import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'disk' })
export class Disk {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 200 })
    description: string;

    @Column({ type: 'varchar', length: 100 })
    category: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    image: string;
}