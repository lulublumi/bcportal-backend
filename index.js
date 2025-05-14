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

app.listen(port, () => {
  console.log(`Backend läuft auf Port ${port}`);
});
