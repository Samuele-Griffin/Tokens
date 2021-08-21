const express = require('express');
const app = express();
const Usuario = require('../models/usuarios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/auth', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: err.errors,
            });
        }
        if (!usuariodb) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no encontrado',
            })
        }
        if (!bcrypt.compareSync(body.password, usuariodb.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Las contraseñas no son validas',
            })
        }

        let token = jwt.sign({
            usuario: usuariodb,
        }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXP });

        res.json({
            ok: true,
            message: 'Autenticacion con exito',
            token,
        })
    });
});


module.exports = app;