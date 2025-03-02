import { Test, TestingModule } from '@nestjs/testing';
import { MapdataService } from './mapdata.service';

describe('MapdataService', () => {
  let service: MapdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapdataService],
    }).compile();

    service = module.get<MapdataService>(MapdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
