const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// creamos el servidor
const app = express();

// conectamos a la bd
conectarDB();

//se abilita midleware para mandar datos json
app.use(express.json());
app.use(cors());

// rutas
app.use('/api/productos', require('./routes/producto'));

app.listen(4000, () => {
    console.log('el servidor esta coerriendo')
})