import { Instrument } from 'src/instruments/entities/instrument.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class UserInstrument {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  instrumentId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Instrument)
  instrument: Instrument;
}
