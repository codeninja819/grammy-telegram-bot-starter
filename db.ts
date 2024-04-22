import mongoose from 'mongoose';

export const connect = async () => {
  await mongoose.connect(process.env.DB_URL!);
  console.log('mongodb connected');
  return true;
};
