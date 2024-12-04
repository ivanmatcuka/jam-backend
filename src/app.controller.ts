import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import examples from './swagger/examples/app';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, PickType } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  @ApiBody({
    type: PickType(CreateUserDto, ['email', 'password']),
    examples: examples.login,
  })
  login(@Request() request) {
    return this.authService.login(request.user);
  }

  @Post('auth/register')
  @ApiBody({
    type: PickType(CreateUserDto, ['email', 'password']),
    examples: examples.register,
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
