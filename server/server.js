const express = require('express');
const app = express();
const port = 3000;
const itemRouter = require('./routes/itemRouter');
const connectToDatabase = require('./config/database');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require('cors');
app.use(cors());
connectToDatabase();

// Routes
app.use('/items', itemRouter);

// Unknown route handler
app.use('*', (req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});