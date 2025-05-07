import { CreateUserInstrumentDto } from './dto/create-user-instrument.dto';
import { UserInstrument } from './entities/user-instrument.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserInstrumentsService {
  constructor(
    @InjectRepository(UserInstrument)
    private userInstrumentsRepository: Repository<UserInstrument>,
  ) {}

  create(createUserInstrumentDto: CreateUserInstrumentDto) {
    return this.userInstrumentsRepository.create(createUserInstrumentDto);
  }

  save(userInstrument: UserInstrument) {
    return this.userInstrumentsRepository.save(userInstrument);
  }

  find(options?: FindManyOptions<UserInstrument>) {
    return this.userInstrumentsRepository.find(options);
  }

  findOne(userId: string, instrumentId: number) {
    return this.userInstrumentsRepository.findOne({
      where: { userId, instrumentId },
    });
  }

  remove(userId: string, instrumentId: number) {
    return this.userInstrumentsRepository.delete({ userId, instrumentId });
  }
}
