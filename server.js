const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const score = require('./server/routes/score');
const minifyHTML = require('express-minify-html');
const compression = require('compression');

const app = express();

app.use(helmet());

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
}));

app.use(compression());

let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// mongoose setup
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'dist/sudoku')));
app.use('/scores', express.static(path.join(__dirname, 'dist/sudoku')));  // angular project
app.use('/api', score);

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, function(){
  console.log('Sudoku app listening on port ' + port +'!')
})
