const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/testRoutes'));
app.use('/products', require('./routes/productRoutes'));

// Exportez l'application Express pour Vercel
module.exports = app;