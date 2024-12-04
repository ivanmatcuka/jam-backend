import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre } from './entities/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([Genre]), CaslModule],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
