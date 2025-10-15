exports.spidLogin = (req, res) => {
  console.log("✅ Body ricevuto:", req.body); // DEBUG visivo

  const { codiceFiscale, nome, cognome, email } = req.body;

  if (!codiceFiscale || !nome || !cognome || !email) {
    return res.status(400).json({ message: "Errore autenticazione SPID" });
  }

  // Se tutto va bene
  res.status(200).json({
    message: "Autenticazione SPID riuscita",
    utente: { codiceFiscale, nome, cognome, email }
  });
};
