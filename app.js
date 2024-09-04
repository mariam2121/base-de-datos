const express = require('express');
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario'); // Asegúrate de que este archivo exporta correctamente el modelo
const uri = "mongodb+srv://user:user@cluster0.lhs5g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

app.get('/api/usuario', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error al obtener usuarios');
  }
});

app.post('/usuarios', async (req, res) => {
  const { nombre, contraseña } = req.body;

  if (!nombre || !contraseña) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const nuevoUsuario = new Usuario({
    nombre,
    contraseña
  });

  try {
    await nuevoUsuario.save();
    res.status(201).send('Usuario agregado exitosamente');
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).send('Error al agregar usuario');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
