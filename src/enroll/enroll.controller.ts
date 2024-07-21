import { Controller, Post, Body } from '@nestjs/common';
import { EnrollService } from './enroll.service';

@Controller('enroll')
export class EnrollController {
  constructor(private readonly enrollService: EnrollService) {}

  @Post('/')
  async createEnrollment(
    @Body('address') address: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('enrollmentType') enrollmentType: string,
    @Body('switchStandardDate') switchStandardDate: string,
    @Body('switchSpecificDate') switchSpecificDate: string,
    @Body('moveDesiredDate') moveDesiredDate: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('ssn') ssn: string,
    @Body('email') email: string,
    @Body('dateOfBirth') dateOfBirth: string,
  ) {
    const generatedId = await this.enrollService.insertEnroll(
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
    );
    return { id: generatedId };
  }
}
