// index.js — CORRETTO
require('dotenv').config();          // <--- PRIMA DI TUTTO

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');   // ora dopo dotenv

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione al DB
connectDB();

// Rotte
app.use('/api', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`✅ Server in ascolto su http://localhost:${PORT}`);
});
