const User = require('../models/User');
const jwt = require('jsonwebtoken');

const loginSpid = async (req, res) => {
  try {
    // Simuliamo i dati ricevuti da SPID (in realtà arriverebbero da un provider esterno)
    const spidData = {
      codiceFiscale: req.body.codiceFiscale,
      nome: req.body.nome,
      cognome: req.body.cognome,
      email: req.body.email
    };

    let user = await User.findOne({ codiceFiscale: spidData.codiceFiscale });

    if (!user) {
      // Se non esiste, lo creiamo
      user = new User(spidData);
      await user.save();
    }

    // Generiamo un token (valido 1 giorno)
    const token = jwt.sign(
      { id: user._id, ruolo: user.ruolo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Errore login SPID:', error.message);
    res.status(500).json({ message: 'Errore autenticazione SPID' });
  }
};

module.exports = { loginSpid };
