const jwt = require('jsonwebtoken');

module.exports.validatorUser = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'error al procesar el token',
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};