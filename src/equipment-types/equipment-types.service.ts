import { CreateEquipmentTypeDto } from './dto/create-equipment-type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment-type.dto';
import { EquipmentType } from './entities/equipment-type.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentTypesService {
  constructor(
    @InjectRepository(EquipmentType)
    private equipmentTypesRepository: Repository<EquipmentType>,
  ) {}

  create(createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypesRepository.create(createEquipmentTypeDto);
  }

  save(equipmentType: EquipmentType) {
    return this.equipmentTypesRepository.save(equipmentType);
  }

  findAll() {
    return this.equipmentTypesRepository.find();
  }

  findOne(id: number) {
    return this.equipmentTypesRepository.findOne({ where: { id } });
  }

  update(id: number, updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    return this.equipmentTypesRepository.update(+id, updateEquipmentTypeDto);
  }

  remove(id: number) {
    return this.equipmentTypesRepository.delete(+id);
  }
}
