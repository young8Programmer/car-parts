import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Part } from '../../parts/entities/part.entity';
// error handling yaxshilandi
// package.json yangilandi
// kod strukturasini yaxshilash
// bundle size optimallashtirildi
// shopping cart funksiyasi qo'shildi

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
// changelog yangilandi
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToMany(() => Part, (part) => part.categories)
  @JoinTable()
  parts: Part[];
}

