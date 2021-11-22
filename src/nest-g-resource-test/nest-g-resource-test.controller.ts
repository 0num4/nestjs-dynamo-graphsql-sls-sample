import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NestGResourceTestService } from './nest-g-resource-test.service';
import { CreateNestGResourceTestDto } from './dto/create-nest-g-resource-test.dto';
import { UpdateNestGResourceTestDto } from './dto/update-nest-g-resource-test.dto';

@Controller('nest-g-resource-test')
export class NestGResourceTestController {
  constructor(private readonly nestGResourceTestService: NestGResourceTestService) {}

  @Post()
  create(@Body() createNestGResourceTestDto: CreateNestGResourceTestDto) {
    return this.nestGResourceTestService.create(createNestGResourceTestDto);
  }

  @Get()
  findAll() {
    return this.nestGResourceTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nestGResourceTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNestGResourceTestDto: UpdateNestGResourceTestDto) {
    return this.nestGResourceTestService.update(+id, updateNestGResourceTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nestGResourceTestService.remove(+id);
  }
}
