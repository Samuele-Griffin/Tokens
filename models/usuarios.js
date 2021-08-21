const mongoose = require('mongoose');
const mongooseUnique = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let values = {
    values: ['user', 'admin'],
    message: '{VALUE} no es valido tiene que ser user o admin',
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        default: '',
        required: [true, 'El campo es obligatorio'],
    },
    email: {
        type: String,
        default: '',
        required: [true, 'El campo de email es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        default: '',
        required: [true, 'El campo es obligatorio']
    },
    estado: {
        type: Boolean,
        default: false,
    },
    google: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'user',
        required: [false],
        enum: values,
    },
    img: {
        type: String,
        default: '',
    }
});

usuarioSchema.methods.toJSON = function() {
    let atraparUsuario = this;
    let usuarioObject = atraparUsuario.toObject();
    delete usuarioObject.password;
    return usuarioObject;
};

usuarioSchema.plugin(mongooseUnique, { message: '{PATH} tiene que ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);