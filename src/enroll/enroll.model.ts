import * as mongoose from 'mongoose';

export const EnrollSchema = new mongoose.Schema({
  address: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  enrollmentType: { type: String },
  switchStandardDate: { type: String },
  switchSpecificDate: { type: String },
  moveDesiredDate: { type: String },
  phoneNumber: { type: Number },
  ssnDigits: { type: String },
  emailAddress: { type: String },
  dateOfBirth: { type: String },
});

export interface Enroll extends mongoose.Document {
  id: string;
  address: string;
  firstName: string;
  lastName: string;
  enrollmentType: string;
  switchStandardDate: string;
  switchSpecificDate: string;
  moveDesiredDate: string;
  phoneNumber: number;
  ssn4Digits: string;
  emailAddress: string;
  dateOfBirth: string;
}
