import { PartialType } from '@nestjs/swagger';
import { CreateNestGResourceTestDto } from './create-nest-g-resource-test.dto';

export class UpdateNestGResourceTestDto extends PartialType(CreateNestGResourceTestDto) {}
