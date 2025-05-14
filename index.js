import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const benutzerdaten = {
  "testgmbh": [
    {
      username: "demo",
      password: "1234",
      kundennummer: "TG-1001",
      ansprechpartner: "Sabine Müller"
    },
    {
      username: "max",
      password: "passwort",
      kundennummer: "TG-1002",
      ansprechpartner: "Felix Bauer"
    }
  ]
};

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/login', (req, res) => {
  const { kunde, username, password } = req.body;

  if (!kunde || !username || !password) {
    return res.status(400).json({ error: "Ungültige Eingabedaten" });
  }

  const nutzerliste = benutzerdaten[kunde];

  if (!nutzerliste) {
    return res.status(404).json({ error: "Kunde nicht gefunden" });
  }

  const user = nutzerliste.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Benutzername oder Passwort falsch" });
  }

  // Erfolgreich
  res.json({
    success: true,
    username: user.username,
    kundennummer: user.kundennummer,
    ansprechpartner: user.ansprechpartner
  });
});

app.listen(port, () => {
  console.log(`Backend läuft auf Port ${port}`);
});
