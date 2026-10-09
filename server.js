import express from 'express';
import dotenv from 'dotenv';
import { supabase } from './src/config/supabaseClient.js';

dotenv.config(); // <-- Esto es fundamental para que lea el entorno

const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Ruta principal
app.get('/', async (req, res) => {
  try {
    // Consultar los perfiles de terapeutas y sus usuarios asociados
    const { data: therapists, error } = await supabase
      .from('therapist_profiles')
      .select('*, users(full_name)');

    if (error) {
      throw error;
    }

    // Renderizar la vista index.ejs pasando los datos
    res.render('index', { therapists });
  } catch (err) {
    console.error('❌ Error detallado al consultar Supabase:', err.message);
    res.status(500).send(`Error interno del servidor: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
