import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [UsersModule, DBModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
