import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PaginationDto } from 'src/common';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern({ cdm: 'create_comment' })
  create(@Payload() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @MessagePattern({ cmd: 'find_all_comment' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.commentsService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_comment' })
  findOne(@Payload('id') id: number) {
    return this.commentsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update_comment' })
  update(@Payload() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto.id, updateCommentDto);
  }

  @MessagePattern({ cmd: 'delete_comment' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.commentsService.remove(id);
  }
}
