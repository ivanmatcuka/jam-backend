import { EquipmentType } from 'src/equipment-types/entities/equipment-type.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => EquipmentType, { nullable: false })
  equipmentType: EquipmentType;

  @ManyToOne(() => Room, { nullable: false })
  room: Room;
}
