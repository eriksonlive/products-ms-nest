import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MapdataService } from './mapdata.service';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { UpdateMapdatumDto } from './dto/update-mapdatum.dto';

@Controller()
export class MapdataController {
  constructor(private readonly mapdataService: MapdataService) {}

  @MessagePattern('createMapdatum')
  create(@Payload() createMapdatumDto: CreateMapdatumDto) {
    return this.mapdataService.create(createMapdatumDto);
  }

  @MessagePattern('findAllMapdata')
  findAll() {
    return this.mapdataService.findAll();
  }

  @MessagePattern('findOneMapdatum')
  findOne(@Payload() id: number) {
    return this.mapdataService.findOne(id);
  }

  @MessagePattern('updateMapdatum')
  update(@Payload() updateMapdatumDto: UpdateMapdatumDto) {
    return this.mapdataService.update(updateMapdatumDto.id, updateMapdatumDto);
  }

  @MessagePattern('removeMapdatum')
  remove(@Payload() id: number) {
    return this.mapdataService.remove(id);
  }
}
