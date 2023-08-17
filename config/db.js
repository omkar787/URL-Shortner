import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DataBase!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDatabase;
