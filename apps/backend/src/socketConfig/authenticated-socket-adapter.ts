/* eslint-disable prettier/prettier */
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { Server } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { CoreNameSpaces } from '@TRPI/core-nt';

export class AuthenticatedSocketAdapter extends IoAdapter {
  private readonly authService: AuthService;


  constructor(app: INestApplicationContext) {
    super(app);
    this.authService = app.get(AuthService);
  }

  private validate = async (socket , next) => {
    const tokenPayload = socket.handshake?.headers?.access_token;
    console.log(tokenPayload)
    if (!tokenPayload) {
      return next(new Error('Token not found'));
    }

    const [method, token] = tokenPayload.split(' ');

    try {
      socket.user = {};
      const user = await this.authService.validateToken(token);
      delete user.password;
      socket.user = user;
      return next();
    } catch (error: any) {
      return next(new Error('Authentication error'));
    }
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.use(async (socket: any, next) => {
      await this.validate(socket, next);
    });

    server.of(CoreNameSpaces.MM_RANKED).use(async (socket: any, next) => {
      await this.validate(socket, next);
    });


    return server;
  }
}