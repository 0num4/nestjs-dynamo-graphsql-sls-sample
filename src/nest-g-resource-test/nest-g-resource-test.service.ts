import { Injectable } from '@nestjs/common';
import { CreateNestGResourceTestDto } from './dto/create-nest-g-resource-test.dto';
import { UpdateNestGResourceTestDto } from './dto/update-nest-g-resource-test.dto';

@Injectable()
export class NestGResourceTestService {
  create(createNestGResourceTestDto: CreateNestGResourceTestDto) {
    return 'This action adds a new nestGResourceTest';
  }

  findAll() {
    return `This action returns all nestGResourceTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nestGResourceTest`;
  }

  update(id: number, updateNestGResourceTestDto: UpdateNestGResourceTestDto) {
    return `This action updates a #${id} nestGResourceTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} nestGResourceTest`;
  }
}
