const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/atlas_people4good';

  // Prevent multiple connections
  if (isConnected) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
    });

    isConnected = true;
    console.log(`=========================================`);
    console.log(` MongoDB Atlas / Server Connected: ${conn.connection.host}`);
    console.log(` Database: ${conn.connection.name}`);
    console.log(`=========================================`);
  } catch (error) {
    console.warn(`\n[MongoDB Warning]: Could not connect to MongoDB at ${uri}.`);
    console.warn(`Reason: ${error.message}`);
    console.warn(`Tip: To connect to MongoDB Atlas, update MONGODB_URI in backend/.env with your connection string.`);
    console.warn(`The backend will continue running with a simulated mock database so you can test all features right away.\n`);
    isConnected = false;
  }
};

const getDBStatus = () => ({
  isConnected: mongoose.connection.readyState === 1,
  readyState: mongoose.connection.readyState,
  host: mongoose.connection.host || 'Disconnected/Simulated',
  name: mongoose.connection.name || 'atlas_people4good'
});

module.exports = { connectDB, getDBStatus };

