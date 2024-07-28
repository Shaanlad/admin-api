import { IsString, IsDate } from 'class-validator';

export class CreateEnrollDto {
  @IsString()
  address: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  enrollmentType: string;

  @IsDate()
  switchStandardDate: string;

  @IsDate()
  switchSpecificDate: string;

  @IsDate()
  moveDesiredDate: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  ssn4Digits: string;

  @IsString()
  emailAddress: string;

  @IsDate()
  dateOfBirth: string;
}
