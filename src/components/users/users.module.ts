import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserDbRepository } from '@app/components/users/repository/db/user.repository';
import { UsersService } from '@app/components/users/services/users.service';
import { UsersController } from '@app/components/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserDbRepository])],
  // imports: [TypeOrmModule.forFeature([UserDbRepository],'mongoDB_connection')],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
