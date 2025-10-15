const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  codiceFiscale: {
    type: String,
    required: true,
    unique: true
  },
  nome: String,
  cognome: String,
  email: String,
  ruolo: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
