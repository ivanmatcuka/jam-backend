import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { REQUEST } from '@nestjs/core';
import { ForbiddenError } from '@casl/ability';
import { Action } from 'src/casl/action.enum';
import { StudiosService } from 'src/studios/studios.service';

@Injectable()
export class RoomsService {
  constructor(
    @Inject(REQUEST) private request: Request & { user: JwtPayload },
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    private studiosService: StudiosService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create(createRoomDto: CreateRoomDto) {
    return this.roomsRepository.create(createRoomDto);
  }

  async save(createRoomDto: CreateRoomDto) {
    const studio = await this.studiosService.findById(+createRoomDto.studioId);
    const room = this.create(createRoomDto);
    room.studio = studio;

    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('You can only manage your own studios')
        .throwUnlessCan(Action.Update, studio);
      return this.roomsRepository.save(room);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  findAll(options?: FindManyOptions<Room>) {
    return this.roomsRepository.find(options);
  }

  findOne(options?: FindManyOptions<Room>) {
    return this.roomsRepository.findOne(options);
  }

  findById(id: number) {
    return this.roomsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const studio = await this.studiosService.findById(+updateRoomDto.studioId);
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('You can only manage your own studios')
        .throwUnlessCan(Action.Update, studio);
      return this.roomsRepository.update(+id, updateRoomDto);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  async remove(id: number) {
    const room = await this.findOne({ where: { id }, relations: ['studio'] });
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('You can only delete rooms in your own studios')
        .throwUnlessCan(Action.Update, room.studio);
      return this.roomsRepository.delete(id);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
