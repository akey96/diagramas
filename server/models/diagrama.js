const mongoose= require('mongoose');
let Schema = mongoose.Schema

var claseSchema= new mongoose.Schema({
    titulo : {
        type : String
    },
    atributos : {
        type : Array
    },
    metodos : {
        type : Array
    },
    rectangulo: { 
        type: Schema.Types.ObjectId, ref: 'Rectangulo', 
        required: false 
    },
    state: {
        type: Boolean,
        default: true
    },
})


var diagramaSchema= new mongoose.Schema({
    nombre : {
        type : String
    },
    listaClases : {
        type : [claseSchema],
        default: undefined
    },
    state: {
        type: Boolean,
        default: true
    },
});


const diagrama= mongoose.model('Diagrama', diagramaSchema);
const clase= mongoose.model('Clase', claseSchema);


module.exports = {
    Diagrama: diagrama,
    Clase: clase
}
// module.exports= diagrama;