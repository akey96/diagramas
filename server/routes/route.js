const express = require('express');
const route = express.Router();
const controller = require('../controllers/controller');


// route.get('/', (req,res) => {
//     res.render('index');
// })

// route.get('/crear-diagrama', (req, res) => {
//     res.render('crear_diagrama')
// })






//API
route.post('/api/diagramas', controller.crearDiagrama);
route.get('/api/diagramas/buscar', controller.buscar);


module.exports= route