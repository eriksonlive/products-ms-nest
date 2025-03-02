import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNumber()
  @IsPositive()
  id: number;

  @IsString()
  @Optional()
  name?: string;

  @Optional()
  @IsString()
  content?: string;
}
