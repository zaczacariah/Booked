const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';



mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Successfully connected to ${connectionString}`);
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });


module.exports = mongoose.connection;
