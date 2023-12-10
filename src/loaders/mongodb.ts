import mongoose from "mongoose";
import { environmentVariables } from "../common/environment";

export async function connectDatabaseLoader() {
  try {
    await mongoose.connect(environmentVariables.database.urlConnection);
    console.log("Database connected!");
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
