import * as mongoose from 'mongoose';

export const PaymentSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String },
  amount: { type: Number },
  session: { type: String },
});

export interface Payment extends mongoose.Document {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  amount: string;
  session: string;
}
