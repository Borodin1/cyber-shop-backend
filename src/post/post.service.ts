import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostInput } from './dto/post.input';

@Injectable()
export class PostService {
  constructor(protected readonly prisma: PrismaService) { }

  async createPost(data: PostInput) {
    const exist = await this.prisma.post.findFirst({
      where: { title: data.title },
    });
    if (exist) throw new BadRequestException('Post exist');
    const post = await this.prisma.post.create({
      data: { brand: data.brand, ...data },
    });
    console.log(post);

    return post;
  }
  async getAll() {
    const posts = await this.prisma.post.findMany();
    if (!posts) throw new BadRequestException('No posts');
    return posts;
  }
  async getOne(id: string) {
    const post = await this.prisma.post.findFirst({ where: { id } });
    if (!post) throw new BadRequestException('No posts');
    return post;
  }
}
