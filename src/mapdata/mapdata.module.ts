import { Module } from '@nestjs/common';
import { MapdataService } from './mapdata.service';
import { MapdataController } from './mapdata.controller';

@Module({
  controllers: [MapdataController],
  providers: [MapdataService],
})
export class MapdataModule {}
