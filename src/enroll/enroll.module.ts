import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollService } from './enroll.service';
import { EnrollController } from './enroll.controller';
import { EnrollSchema } from './enroll.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Enroll', schema: EnrollSchema }]),
  ],
  providers: [EnrollService],
  controllers: [EnrollController],
})
export class EnrollModule {}
