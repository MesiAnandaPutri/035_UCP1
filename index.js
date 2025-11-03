const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post("/music", async (req, res) => {
  const data = req.body;
  try {
    const music = await db.Music.create(data);
    res.status(201).send(music);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Gagal menambah data", error: err.message });
  }
});


