const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app = express();

//Body Parser Middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose
  .connect(db)
  .then(() => console.log('Mongodb Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
