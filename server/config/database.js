require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database');
  } catch(err) {
    console.error('Could not connect to MongoDB\n', err);
    process.exit(1);
  }
};

module.exports = connectToDatabase;