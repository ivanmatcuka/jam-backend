import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) {}

  create(createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentRepository.create(createEquipmentDto);
  }

  save(equipment: Equipment) {
    return this.equipmentRepository.save(equipment);
  }

  findAll() {
    return this.equipmentRepository.find();
  }

  findOne(id: number) {
    return this.equipmentRepository.findOne({ where: { id } });
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentRepository.update(+id, updateEquipmentDto);
  }

  remove(id: number) {
    return this.equipmentRepository.delete(+id);
  }
}
