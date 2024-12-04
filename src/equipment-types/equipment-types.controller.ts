import { EquipmentTypesService } from './equipment-types.service';
import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

@Controller('equipment-types')
export class EquipmentTypesController {
  constructor(private readonly equipmentTypesService: EquipmentTypesService) {}

  @Post()
  create(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypesService.create(createEquipmentTypeDto);
  }

  @Get()
  findAll() {
    return this.equipmentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentTypeDto: UpdateEquipmentTypeDto,
  ) {
    return this.equipmentTypesService.update(+id, updateEquipmentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentTypesService.remove(+id);
  }
}
