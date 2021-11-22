import { Test, TestingModule } from '@nestjs/testing';
import { NestGResourceTestService } from './nest-g-resource-test.service';

describe('NestGResourceTestService', () => {
  let service: NestGResourceTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestGResourceTestService],
    }).compile();

    service = module.get<NestGResourceTestService>(NestGResourceTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
