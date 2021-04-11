require('dotenv').config();
const errorHandler = require('./utils/error_handler');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('short'));

app.use('/api', require('./routes/dailies.controller'));

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));