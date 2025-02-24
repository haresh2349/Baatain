import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password, profilePhoto } = createUserDto;

    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    const newUser = await this.usersRepository.create({
      email,
      username,
      password,
      profilePhoto: profilePhoto || null,
    });

    return await this.usersRepository.save(newUser);
  }

  async fetchUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async fetchSingleUser({
    username,
    email,
    id,
  }: {
    username?: string;
    email?: string;
    id?: string;
  }): Promise<User> {
    return await this.usersRepository.findOne({
      where: [
        id ? { id } : null,
        email ? { email } : null,
        username ? { username } : null,
      ].filter(Boolean),
    });
  }
}
