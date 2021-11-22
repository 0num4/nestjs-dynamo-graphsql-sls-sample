import { Test, TestingModule } from '@nestjs/testing';
import { NestGResourceTestController } from './nest-g-resource-test.controller';
import { NestGResourceTestService } from './nest-g-resource-test.service';

describe('NestGResourceTestController', () => {
  let controller: NestGResourceTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NestGResourceTestController],
      providers: [NestGResourceTestService],
    }).compile();

    controller = module.get<NestGResourceTestController>(NestGResourceTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
