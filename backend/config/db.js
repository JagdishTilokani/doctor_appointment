import mongoose from "mongoose";
import User from "../models/usersModel.js";

const connectDB = async () => {
  try {
    //database Name
    // const databaseName='MERN';
    const connection_string =
      "mongodb+srv://jagdish:jagdish@hospitalinfo.v4nlz.mongodb.net/HospitalInfo";
    const con = await mongoose.connect(
      // `mongodb://127.0.0.1:27017/${databaseName}`,
      connection_string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
