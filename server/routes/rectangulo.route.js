const express = require('express')
// importamos modelo USer de mongo

const Rectangulo = require("../models/rectangulo");

// importacion de underscore
const _ = require('underscore')

const app = express()


// listar
app.get('/api/rectangulo', (req, res) => {
  
  Rectangulo.find({state: true}, '_id puntoX puntoY ancho alto')
    .exec((err, rectangulosDB) => {
      
        if (err) {
            return res.status(500).json({
            ok: false,
            err
            })
        }

        if (!rectangulosDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Rectangulo.count({}, (errC, nroRectangulos) => {
            res.json({
                ok: true,
                rectangulos: rectangulosDB,
                nroRectangulos
            })
        })
    })
})


app.get('/api/rectangulo/:id', (req, res) => {
    let id = req.params.id
    Rectangulo.findById(id)
      .exec((err, rectanguloDB) => {
        if (err) {
          return res.status(500).json({
            ok: true,
            err
          })
        }
        if (!rectanguloDB) {
          return res.status(400).json({
            ok: false,
            err: {
              message: 'El Id no es valido'
            }
          })
        }
        res.json({
          ok: true,
          rectangulo: rectanguloDB
        })
      })
  })
  


// Eliminar
app.delete('/api/rectangulo/:id',  (req, res) => {
  let id = req.params.id
  let stateModified = {
    state: false,
  }
  Rectangulo.findByIdAndUpdate(id, stateModified, {new: true}, (err, rectanguloDb) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!rectanguloDb) {
        return res.status(400).json({
            ok: false,
            err
        })
    }

    res.json({
      ok: true,
      rectangulo: rectanguloDb
    })
  })

  // =================== otra manera =========
  // User.findById(id, function (err, userID) {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     })
  //   }
  //   userID.state = false
  //   userID.save((errS) => {
  //     if (errS) {
  //       return res.status(400).json({
  //         ok: false,
  //         err: errS
  //       })
  //     }
  //     res.json({
  //       ok: true,
  //       user: userID
  //     })
  //   })
  // })
  // ================== mala forma ==========
  // User.findByIdAndRemove(id, (err, userDeleted) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: true,
  //       err
  //     })
  //   }
  //   if (!userDeleted) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message: 'User no encontrado'
  //       }
  //     })
  //   }
  //   res.json({
  //     ok: true,
  //     userDeleted
  //   })
  // })
})

app.post('/api/rectangulo', (req, res) => {
  
 let body = req.body;
  

  let rectangulo = Rectangulo({
    puntoX: body.puntoX,
    puntoY: body.puntoY,
    ancho: body.ancho,
    alto: body.alto,
    
})

  // metodo save para guardar un user en mondoDB
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
    
    res.json({
      ok: true,
      rectangulo: rectanguloDB
    })
  })
})

app.put('/api/rectangulo/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['puntoX', 'puntoY', 'ancho', 'alto', 'state'])

  // definimo tambien validaciones para que pueda retornar todo el objeto mofificado, y que corra las validaciones definidos en el modelo
  Rectangulo.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, rectanguloDB) => {
    if (err) {
      return res.status(400).json({
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

    res.json({
      ok: true,
      rectangulo: rectanguloDB
    })
  })
})

module.exports = app
