const {Diagrama, Clase} = require("../models/diagrama");
const Rectangulo = require("../models/rectangulo");


//creado la clase
exports.crearDiagrama = (req, res) => {
    
    let rectangulo = Rectangulo({
        puntoX: 1,
        puntoY: 2,
        ancho: 3,
        alto: 4,
        
    })

    rectangulo.save((err, rectanguloDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!rectanguloDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        let clase = Clase({
            titulo: "Persona",
            atributos: ["ojos", 'manos'],
            metodos: ["correr", "saltar"],
            rectangulo: rectangulo
        })

        clase.save((errC, claseDB) => {
            if (errC) {
                return res.status(500).json({
                    ok: false,
                    errC
                })
            }
    
            if (!claseDB) {
                return res.status(400).json({
                    ok: false,
                    errC
                })
            }
            

            let diagrama = Diagrama({
                nombre: "PersonasCosa",
                listaClases: [clase]
            })
            
            diagrama.save((errorD, diagramaDB) => {
                if (errorD) {
                    return res.status(500).json({
                        ok: false,
                        errC
                    })
                }
        
                if (!diagramaDB) {
                    return res.status(400).json({
                        ok: false,
                        errorD
                    })
                }   
                res.status(201).json({ 
                    ok: true,
                    diagrama: diagramaDB
                })
            })
            
        })
    })
}

exports.buscar = (req, res) => {

}
