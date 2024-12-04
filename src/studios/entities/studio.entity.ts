import { Country } from 'src/enums/countries.enum';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  coordinates: string;

  @Column({
    type: 'enum',
    enum: Country,
  })
  country: string;

  @Column({
    nullable: true,
  })
  city?: string;

  @Column({
    nullable: true,
  })
  booking?: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Room, (room) => room.studio)
  rooms: Room[];
}
