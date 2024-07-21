import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enroll } from './enroll.model';

@Injectable()
export class EnrollService {
  constructor(@InjectModel('Enroll') private enrollModel: Model<Enroll>) {}

  //   async create(CreateEnrollDto: Enroll): Promise<Enroll> {
  //     const createdEnroll = new this.enrollModel(CreateEnrollDto);
  //     return createdEnroll.save();
  //   }

  async insertEnroll(
    address: string,
    firstName: string,
    lastName: string,
    enrollmentType: string,
    switchStandardDate: string,
    switchSpecificDate: string,
    moveDesiredDate: string,
    phoneNumber: string,
    ssn: string,
    email: string,
    dateOfBirth: string,
  ) {
    const newEnroll = new this.enrollModel({
      address,
      firstName,
      lastName,
      enrollmentType,
      switchStandardDate,
      switchSpecificDate,
      moveDesiredDate,
      phoneNumber,
      ssn,
      email,
      dateOfBirth,
    });
    const result = await newEnroll.save();
    console.log('Enrollment Inserted >> ', result);

    return result.id as string;
  }
}
