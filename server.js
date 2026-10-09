import express from 'express';
import { supabase } from './src/config/supabaseClient.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.get('/', async (req, res) => {
  try {
    const { data: therapists, error } = await supabase
      .from('therapist_profiles')
      .select('*, users(full_name)');

    if (error) throw error;

    res.render('index', { therapists });
  } catch (err) {
    console.error('❌ Error detallado al consultar Supabase:', err.message);
    res.status(500).send(`Error interno del servidor: ${err.message}`);
  }
});

const PORT = process.env.PORT || 3000;

// Escuchar en 0.0.0.0 es indispensable para que Render detecte el puerto abierto
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
