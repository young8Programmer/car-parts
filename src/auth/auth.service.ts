import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
    if (existingUser) {
      throw new NotFoundException("bunday foydalanuvchi ro'yxatdan o'tgan");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'user',
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Foydalanuvchi yaratishda xatolik yuz berdi!');
    }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Bunday foydalanuvchi mavjud emas, iltimos ro‘yxatdan o‘ting!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Noto‘g‘ri parol!');
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token, user};
  }

  async addAdmin(createUserDto: CreateUserDto) {
    const existingAdmin = await this.userRepository.findOne({ where: { username: createUserDto.username, role: 'admin' } });
    if (existingAdmin) {
      throw new BadRequestException('Bunday admin allaqachon mavjud!');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newAdmin = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: 'admin',
    });

    try {
      return await this.userRepository.save(newAdmin);
    } catch (error) {
      throw new Error('Admin qo‘shishda xatolik yuz berdi!');
    }
  }
}
