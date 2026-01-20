// caching mexanizmi qo'shildi
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// code comments qo'shildi
// shopping cart funksiyasi qo'shildi

// unit testlar qo'shildi
@Entity()
// API hujjatlarini qo'shish
// user authentication qo'shildi
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
  
  @Column()
  email: string;

  @Column({ default: 'user' })
  role: string;
}
