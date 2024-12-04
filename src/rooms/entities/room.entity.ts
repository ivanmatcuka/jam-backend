import { Equipment } from 'src/equipments/entities/equipment.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Studio, { nullable: false })
  studio: Studio;

  @OneToMany(() => Equipment, (epuipment) => epuipment.room)
  equipments: Equipment[];
}
