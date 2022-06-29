const mongoose = require('mongoose');

var rectanguloSchema= new mongoose.Schema({
    puntoX : {
        type : Number
    },
    puntoY : {
        type : Number
    },
    ancho : {
        type : Number
    },
    alto : {
        type : Number
    },
    state: {
        type: Boolean,
        default: true
    },
})


const rectangulo= mongoose.model('Rectangulo', rectanguloSchema);


module.exports = rectangulo;