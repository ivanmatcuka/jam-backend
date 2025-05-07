import { UserGenresService } from './user-genres.service';
import { UserGenresController } from './user-genres.controller';
import { UserGenre } from './entities/user-genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserGenre])],
  controllers: [UserGenresController],
  providers: [UserGenresService],
})
export class UserGenresModule {}
