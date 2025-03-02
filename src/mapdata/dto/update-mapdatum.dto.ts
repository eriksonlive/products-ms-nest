import { PartialType } from '@nestjs/mapped-types';
import { CreateMapdatumDto } from './create-mapdatum.dto';

export class UpdateMapdatumDto extends PartialType(CreateMapdatumDto) {
  id: number;
}
