import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(dto: CreateUserInput, hash: string) {
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hash
      }
    })
    return user
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findFirst({ where: { email } })
  }
  async findById(id: string) {
    return await this.prisma.user.findFirst({ where: { id } })
  }
}
