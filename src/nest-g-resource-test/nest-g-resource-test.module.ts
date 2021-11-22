import { Module } from '@nestjs/common';
import { NestGResourceTestService } from './nest-g-resource-test.service';
import { NestGResourceTestController } from './nest-g-resource-test.controller';

@Module({
  controllers: [NestGResourceTestController],
  providers: [NestGResourceTestService]
})
export class NestGResourceTestModule {}
