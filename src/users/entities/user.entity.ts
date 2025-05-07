import { Country } from 'src/enums/countries.enum';
import { Role } from 'src/users/role.enum';
import { Genre } from 'src/genres/entities/genre.entity';
import { Instrument } from 'src/instruments/entities/instrument.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName?: string;

  @Column({
    type: 'enum',
    enum: Country,
  })
  country: string;

  @Column()
  city: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => Studio, (studio) => studio.user)
  studios?: Studio[];

  @ManyToMany(() => Instrument, (instrument) => instrument.users, {
    cascade: true,
  })
  @JoinTable({ name: 'users_instruments' })
  instruments?: Instrument[];

  @ManyToMany(() => Genre, (genre) => genre.users, { cascade: true })
  @JoinTable({ name: 'users_genres' })
  genres?: Genre[];
}
