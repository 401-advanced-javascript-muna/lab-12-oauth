
'use stricts';

require('dotenv').config();

const server = require ('./src/server');

const mongoose = require ('mongoose');

// const MONGOOSE_URI = 'mongodb://localhost:27017/dbauth';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGOOSE_URI, mongooseOptions);

server.start(process.env.PORT);
















