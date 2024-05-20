const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://benzac:@Entity@hellbent123@booked.sogctvj.mongodb.net/');

module.exports = mongoose.connection;
