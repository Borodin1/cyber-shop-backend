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
    return await this.prisma.user.findFirst({
      where: { id },
      include: { cartItems: { include: { post: true } } }
    })
  }
  async logOut(id: string) {
    await this.prisma.user.delete({ where: { id }, include: { cartItems: true } })
    return { message: 'You are log-out!!' }
  }
  async addInBasket(postId: string, userId: string) {
    const cardItem = await this.prisma.cartItem.findFirst({ where: { userId, postId } })
    if (cardItem) {
      await this.prisma.cartItem.update({
        where: { id: cardItem.id },
        data: { quantity: cardItem.quantity += 1 },
      })
    } else {
      await this.prisma.cartItem.create({
        data: {
          userId,
          postId,
          quantity: 1
        },
      })
    }
    return cardItem
  }
}
