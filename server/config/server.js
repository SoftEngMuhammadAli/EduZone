import mongoose from "mongoose";

async function connectToDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    setTimeout(() => connectToDatabase(databaseUrl), 5000);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Retrying...");
    connectToDatabase(databaseUrl);
  });
}

export default connectToDatabase;