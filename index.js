

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


app.get("/music", async (req, res) => {
  try {
    const music = await db.Music.findAll();
    res.status(200).send(music);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Gagal mengambil data", error: err.message });
  }
});


app.get("/music/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const music = await db.Music.findByPk(id);
    if (!music) {
      return res.status(404).send({ message: "Music tidak ditemukan" });
    }
    res.status(200).send(music);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Gagal mengambil data", error: err.message });
  }
});

app.put("/music/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const music = await db.Music.findByPk(id);
    if (!music) {
      return res.status(404).send({ message: "Music tidak tersedia" });
    }

    await music.update(data);
    res.status(200).send({ message: "Music berhasil diupdate", music });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Gagal mengupdate data", error: err.message });
  }
});

app.delete("/music/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const music = await db.Music.findByPk(id);
    if (!music) {
      return res.status(404).send({ message: "Music tidak tersedia" });
    }

    await music.destroy();
    res.status(200).send({ message: "Music berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Gagal menghapus data", error: err.message });
  }
});

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Gagal konek ke database:', err);
  });
