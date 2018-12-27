import { Response } from 'express';
import * as passport from 'passport';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  Controller,
  Get,
  Post,
  Put,
  UsePipes,
  Body,
  Res,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { ValidationPipe } from '../../validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(AuthGuard())
  // @Query('/user/:userId')
  // public async getUser(@Res() res: Response, @Param() params) {
  //   const { userId } = params;
  //   const user = await this.userService.getUser(userId);
  //   res.status(HttpStatus.OK).json(user);
  // }

  // @UsePipes(new ValidationPipe())
  @Mutation('createUser')
  public async createUser(@Args('createUserInput') args: CreateUserDto) {
    const newUser = await this.userService.createUser(args);
    return newUser;
  }

  @Mutation('loginUser')
  public async loginUser(@Args('loginUserInput') args: LoginUserDto) {
    const loginUser = await this.userService.loginUser(args);
    return loginUser;
  }

  // @UsePipes(new ValidationPipe())
  // @Put('/user')
  // public async updateUser(@Body() user: any, @Res() res: Response) {
  //   const updateUser = await this.userService.updateUser(user);
  //   res.status(HttpStatus.OK).json(updateUser);
  // }
}
