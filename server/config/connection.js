const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://benzac:sbben8204@booked.sogctvj.mongodb.net/booked?retryWrites=true&w=majority&appName=Booked';



mongoose.connect(connectionString, {
    ssl:true,
  }).then(() => {
    console.log(`Successfully connected to ${connectionString}`);
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });


module.exports = mongoose.connection;
