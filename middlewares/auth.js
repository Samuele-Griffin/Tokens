const jwt = require('jsonwebtoken');


//Validacion de tokens (metodo para verificar tokens)

let verificarToken = (req, res, next) => {
    try {
        let token = req.get('token');
        jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    ok: false,
                    err,
                });
            }
            req.usuario = decoded.usuario;
            next();
        });
    } catch (err) {
        throw new Error('Error en la verificacion del token y detalle de los errores' + err);
    };
};

let verificarAdmin = (req, res, next) => {
    try {
        let user = req.usuario.role;
        if (user === 'admin') {
            next();
            return;
        }
        res.status(404).json({
            ok: false,
            message: 'El usuario tiene un rol de user, por lo tanto no es admin'
        })
    } catch (err) {
        throw new Error(err);
    }
};

let verificarUser = (req, res, next) => {
    let user = req.usuario;
    if (user.role === 'user') {
        next();
        return;
    }
    res.status(400).json({
        ok: false,
        message: 'No es un usuario comun y corriente',
    });
};


module.exports = { verificarToken, verificarAdmin, verificarUser };