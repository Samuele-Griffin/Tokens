require('../config/config.js');
const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify('Servidor Conectado con Exito'));
    res.end();
});

app.use(require('../routes/index'));

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, resp) => {
    if (err) {
        throw new Error("Sucedio un error al conectarse con la base de datos :" + err);
    }
    console.log("Conectado a la base de datos en el puerto 27017");
});

app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto " + process.env.PORT);
});