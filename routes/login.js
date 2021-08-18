const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');
const jsonwebtoken = require('jsonwebtoken');

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.errors,
            });
        }
        if (!usuariodb) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Nombre de usuario no encontrado en la base de datos',
                },
            });
        }
        if (!bcrypt.compareSync(body.password, usuariodb.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Contraseñas incorrectas, vuelvalo a intentar',
                },
            });
        }

        let token = jsonwebtoken.sign({
            usuario: usuariodb,
        }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXP });

        res.json({
            ok: true,
            usuario: usuariodb,
            token,
        })
    });
});




module.exports = app;