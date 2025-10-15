// db.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/antisofisti";
    console.log("🔎 URI MONGO:", uri);
    await mongoose.connect(uri);
    console.log("✅ Connessione MongoDB riuscita");
  } catch (error) {
    console.error("❌ Errore connessione MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
