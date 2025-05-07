import { UserInstrumentsService } from './user-instruments.service';
import { UserInstrumentsController } from './user-instruments.controller';
import { UserInstrument } from './entities/user-instrument.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserInstrument])],
  controllers: [UserInstrumentsController],
  providers: [UserInstrumentsService],
})
export class UserInstrumentsModule {}
