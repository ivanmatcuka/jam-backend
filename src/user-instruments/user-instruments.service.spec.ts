import { UserInstrumentsService } from './user-instruments.service';
import { UserInstrument } from './entities/user-instrument.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

describe('UserInstrumentsService', () => {
  let service: UserInstrumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserInstrumentsService,
        {
          provide: getRepositoryToken(UserInstrument),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserInstrumentsService>(UserInstrumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
