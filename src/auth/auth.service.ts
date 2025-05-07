import { JwtPayload } from './jwt.strategy';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private generatePasswordHash(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  private verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  async validateUser(email: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user && this.verifyPassword(password, user.password)) {
      // const { password, ...result } = user;
      return user;
    }

    return null;
  }

  register(createUserDto: CreateUserDto) {
    const hash = this.generatePasswordHash(createUserDto.password);
    const user = this.usersService.create({ ...createUserDto, password: hash });
    return this.usersService.save(user);
  }

  login(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
