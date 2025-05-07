import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ForbiddenError } from '@casl/ability';
import { Action } from 'src/casl/action.enum';

@Injectable()
export class GenresService {
  constructor(
    @Inject(REQUEST)
    private request: Request & { user: JwtPayload },
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create(createGenreDto: CreateGenreDto) {
    return this.genresRepository.create(createGenreDto);
  }

  findAll(options?: FindManyOptions<Genre>) {
    return this.genresRepository.find(options);
  }

  findOne(id: string) {
    return this.genresRepository.findOne({ where: { id } });
  }

  save(genre: Genre) {
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('Only admins can manage genres')
        .throwUnlessCan(Action.Create, Genre);
      return this.genresRepository.save(this.create(genre));
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  update(id: string, updateGenreDto: UpdateGenreDto) {
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('Only admins can manage genres')
        .throwUnlessCan(Action.Update, Genre);
      return this.genresRepository.update(id, updateGenreDto);
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
        .setMessage('Only admins can manage genres')
        .throwUnlessCan(Action.Delete, Genre);
      return this.genresRepository.delete(id);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
