import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { Studio } from './entities/studio.entity';
import { ForbiddenException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ForbiddenError } from '@casl/ability';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/action.enum';

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class StudiosService {
  constructor(
    @Inject(REQUEST) private request: Request & { user: JwtPayload },
    @InjectRepository(Studio) private studiosRepository: Repository<Studio>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  create(createStudioDto: CreateStudioDto) {
    return this.studiosRepository.create({
      ...createStudioDto,
      userId: this.request.user.sub,
    });
  }

  save(createStudioDto: CreateStudioDto) {
    return this.studiosRepository.save(this.create(createStudioDto));
  }

  findAll(options?: FindManyOptions<Studio>) {
    return this.studiosRepository.find(options);
  }

  findOne(options?: FindManyOptions<Studio>) {
    return this.studiosRepository.findOne(options);
  }

  findById(id: number) {
    return this.studiosRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStudioDto: UpdateStudioDto) {
    const studio = await this.findById(id);
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('You can only manage your own studios')
        .throwUnlessCan(Action.Update, studio);
      return this.studiosRepository.update(+id, updateStudioDto);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }

  async remove(id: number) {
    const studio = await this.findById(id);
    const ability = this.caslAbilityFactory.createForUser(this.request.user);

    try {
      ForbiddenError.from(ability)
        .setMessage('You can only delete your own studios')
        .throwUnlessCan(Action.Update, studio);
      return this.studiosRepository.delete(+id);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }
    }
  }
}
