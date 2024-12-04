import { Equipment } from 'src/equipments/entities/equipment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EquipmentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Equipment, (equipment) => equipment.equipmentType)
  equipments: Equipment[];
}
