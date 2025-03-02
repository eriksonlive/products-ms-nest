import { Test, TestingModule } from '@nestjs/testing';
import { MapdataController } from './mapdata.controller';
import { MapdataService } from './mapdata.service';

describe('MapdataController', () => {
  let controller: MapdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapdataController],
      providers: [MapdataService],
    }).compile();

    controller = module.get<MapdataController>(MapdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
