import { EquipmentTypesService } from './equipment-types.service';
import { EquipmentTypesController } from './equipment-types.controller';
import { EquipmentType } from './entities/equipment-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentType])],
  controllers: [EquipmentTypesController],
  providers: [EquipmentTypesService],
  exports: [EquipmentTypesService],
})
export class EquipmentTypesModule {}
