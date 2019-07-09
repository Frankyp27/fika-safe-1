
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

// Bodyparser Middleware
app.use(express.json());

const port = process.env.PORT || 5000;


mongoose.connect('mongodb://127.0.0.1:27017/fika-safe', { 
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => {
  app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
  });
}).catch((error) => {
  console.log({ message: 'Unable to establish a connection to the server' });
});


// use routes
app.use('/api/riders', require('./routes/api/riders'));
app.use('/api/saccos', require('./routes/api/saccos'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
