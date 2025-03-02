import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CommentsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsServices');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  async create(createCommentDto: CreateCommentDto) {
    return this.comment.create({
      data: createCommentDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPage = await this.comment.count({});
    const lastPage = Math.ceil(totalPage / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
      }),
      meta: {
        total: totalPage,
        page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const comment = await this.comment.findFirst({
      where: { id },
    });

    if (!comment) {
      throw new RpcException({
        message: `Comment with id: ${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { id: __, ...data } = updateCommentDto;

    await this.findOne(id);

    return this.comment.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const comment = await this.comment.update({
      where: { id },
      data: {
        // available: false
      },
    });

    return comment;
  }
}
