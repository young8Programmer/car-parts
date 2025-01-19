import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  visibilityInCatalog: string;

  @Column()
  language: string;

  @Column({ nullable: true })
  translationGroup: number;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  description: string; 

  @Column({ default: true })
  inStock: boolean;

  @Column({ nullable: true })
  categories: string; 

   @Column('simple-array', { nullable: true })
   images: string[]; 

  @Column({ nullable: true })
  carName: string;

  @Column({ nullable: true })
  model: string; 

  @Column({ nullable: true })
  oem: string; 

  @Column({ nullable: true })
  years: string;
  
  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  imageUrl: string; 

  @Column({ nullable: true })
  trtCode: string;

  @Column({ nullable: true })
  brand: string;
}
