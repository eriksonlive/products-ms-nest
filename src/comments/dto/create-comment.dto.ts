import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  public content: string;

  @IsString()
  @IsOptional()
  public name: string;

  @IsNumber()
  public user: number;
}
