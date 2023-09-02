import mongoose from 'mongoose';

export const dbConnect = async () => {
  // Const user = process.env.DB_USER;
  // const password = process.env.DB_PASSWORD;
  const uri = `mongodb+srv://jesusalvarezaguilar:kubo@cluster0.nvhsutx.mongodb.net/?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
