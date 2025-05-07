import { InstrumentsService } from './instruments.service';
import { InstrumentsController } from './instruments.controller';
import { Instrument } from './entities/instrument.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Instrument]), CaslModule],
  providers: [InstrumentsService],
  controllers: [InstrumentsController],
})
export class InstrumentsModule {}
