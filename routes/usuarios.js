const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Usuario = require('../models/usuarios');
let bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const underscore = require('underscore');
const autentificacion = require('../middlewares/auth.js');
const { validatorUser } = require('../middlewares/authentication.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/tokenstatus', (req, res) => {
    return res.status(200).json({
        usuario: req.usuario,
    })
});

app.get('/usuarios', [validatorUser], (req, res, next) => {
    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 0);

    Usuario.find({ estado: true }, 'nombre email google img estado')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    status: false,
                    message: err.errors,
                });
            }
            Usuario.count({ estado: true }, (err, cont) => {
                res.status(200).json({
                    status: true,
                    ...usuarios,
                    cont,
                });
            });
        });
});

app.post("/usuarios", [validatorUser, autentificacion.verificarAdmin], (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        estado: true,
    });
    usuario.save((err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.errors,
            });
        }
        res.json({
            ok: true,
            usuario: usuariodb,
        });
    });
});

app.put("/usuarios/:id", [validatorUser, autentificacion.verificarAdmin], (req, res) => {
    let id = req.params.id;
    let body = underscore.pick(req.body, [
        "nombre",
        "email",
        "role",
        "estado",
        "img",
    ]);

    Usuario.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true, context: "query" },
        (err, usuariodb) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err,
                });
            }
            res.json({
                ok: true,
                usuario: usuariodb,
            });
        }
    );
});

app.delete("/usuarios/:id", [validatorUser, autentificacion.verificarAdmin], (req, res) => {
    let id = req.params.id;
    let user = {
        estado: false,
    };
    Usuario.findByIdAndUpdate(id, user, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err,
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    error: "Usuario no encontrado",
                },
            });
        }
        return res.json({
            ok: true,
            message: "Se elimina el usuario de la base de datos " + id,
            usuario: usuarioBorrado,
        });
    });
});


module.exports = app;