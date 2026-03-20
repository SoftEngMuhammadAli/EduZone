import mongoose from "mongoose";

const isValidMongoUri = (value = "") =>
  value.startsWith("mongodb://") || value.startsWith("mongodb+srv://");

async function connectToDatabase(databaseUrl) {
  try {
    const uri = String(databaseUrl || "").trim();

    if (!uri) {
      throw new Error(
        "Missing MongoDB URI. Set DB_CONFIGURATION or MONGO_URI in your .env file.",
      );
    }

    if (!isValidMongoUri(uri)) {
      throw new Error(
        'Invalid MongoDB URI scheme. It must start with "mongodb://" or "mongodb+srv://".',
      );
    }

    await mongoose.connect(uri);
    console.log("EduZone database connected successfully.");
  } catch (error) {
    console.error("Error while connecting to database:", error.message);
    process.exit(1);
  }
}

export default connectToDatabase;
