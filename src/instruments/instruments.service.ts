import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Instrument } from './entities/instrument.entity';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ForbiddenError } from '@casl/ability';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { REQUEST } from '@nestjs/core';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { Action } from 'src/casl/action.enum';

@Injectable()
export class InstrumentsService {
  constructor(
    @Inject(REQUEST)
    private request: Request & { user: JwtPayload },
    @InjectRepository(Instrument)
    private instrumentsRepository: Repository<Instrument>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  findAll(options?: FindManyOptions<Instrument>) {
    return this.instrumentsRepository.find(options);
  }

  findOne(options?: FindManyOptions<Instrument>) {
    return this.instrumentsRepository.findOne(options);
  }

  findById(id: string) {
    return this.instrumentsRepository.findOne({ where: { id } });
  }

  create(createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentsRepository.create(createInstrumentDto);
  }

  save(createInstrumentDto: CreateInstrumentDto) {
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('Only admins can manage instruments')
        .throwUnlessCan(Action.Create, Instrument);
      return this.instrumentsRepository.save(this.create(createInstrumentDto));
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  update(id: string, updateInstrumentDto: UpdateInstrumentDto) {
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('Only admins can manage instruments')
        .throwUnlessCan(Action.Update, Instrument);
      return this.instrumentsRepository.update(id, updateInstrumentDto);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  remove(id: string) {
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('Only admins can manage instruments')
        .throwUnlessCan(Action.Delete, Instrument);
      return this.instrumentsRepository.delete(id);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
