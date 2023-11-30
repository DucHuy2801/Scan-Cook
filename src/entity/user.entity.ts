import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'nvarchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    hashedRt: string;
}