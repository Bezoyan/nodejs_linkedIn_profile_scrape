import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

import Profiles from "./models/profile.js";
import login from "./login.js"



async function bulkCreateProfiles () {
  try {
    // DB connection
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
  })
  .then(() => console.log("Db is connected!"))
  .catch((err) => console.log(err));


  const val = await login();
      // Save data in MongoDB
      // TODO: check if user already exist
      Profiles.insertMany(val);

      // Close db connection
      mongoose.connection.close(function(){
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
   }
 catch (error) {
    console.log(error);
  }
}

bulkCreateProfiles();