const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

//Body Parser Middleware
app.use(express.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Mongodb Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/Items'));
app.use('/api/users', require('./routes/api/Users'));

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
