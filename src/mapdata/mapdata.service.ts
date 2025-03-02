import { Injectable } from '@nestjs/common';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { UpdateMapdatumDto } from './dto/update-mapdatum.dto';

@Injectable()
export class MapdataService {
  create(createMapdatumDto: CreateMapdatumDto) {
    return 'This action adds a new mapdatum';
  }

  findAll() {
    return `This action returns all mapdata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mapdatum`;
  }

  update(id: number, updateMapdatumDto: UpdateMapdatumDto) {
    return `This action updates a #${id} mapdatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} mapdatum`;
  }
}
