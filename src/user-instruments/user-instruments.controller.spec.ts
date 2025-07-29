import { UserInstrumentsController } from './user-instruments.controller';
import { UserInstrumentsService } from './user-instruments.service';
import { UserInstrument } from './entities/user-instrument.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UserInstrumentsController', () => {
  let controller: UserInstrumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInstrumentsController],
      providers: [
        UserInstrumentsService,
        {
          provide: getRepositoryToken(UserInstrument),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<UserInstrumentsController>(
      UserInstrumentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
