import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: "todos"})
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: null })
  ownedBy: string;

  @Column({ default: null })
  checkedAt: Date;

  @Column()
  createdAt: Date;
}
