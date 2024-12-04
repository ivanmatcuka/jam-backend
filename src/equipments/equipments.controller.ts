import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipmentTypesService } from 'src/equipment-types/equipment-types.service';
import { RoomsService } from 'src/rooms/rooms.service';

@Controller('equipments')
export class EquipmentsController {
  constructor(
    private readonly equipmentsService: EquipmentsService,
    private readonly equipmentTypesService: EquipmentTypesService,
    private readonly roomsService: RoomsService,
  ) {}

  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto) {
    const { roomId, equipmentTypeId } = createEquipmentDto;
    const room = await this.roomsService.findById(roomId);
    const equipmentType = await this.equipmentTypesService.findOne(
      equipmentTypeId,
    );
    const equipment = this.equipmentsService.create(createEquipmentDto);
    equipment.room = room;
    equipment.equipmentType = equipmentType;

    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll() {
    return this.equipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentsService.remove(+id);
  }
}
