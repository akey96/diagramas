const express= require('express');
const app= express();

const conexionDB= require('./server/database/conexion')


const bodyParser = require('body-parser')

app.set("view engine", "ejs");

app.get('/', (req , res) => {
    res.render('index');
});


conexionDB();

// app.use('/', require('./server/routes/route'))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// usando las rutas configuradas
app.use(require('./server/routes/index'))


app.listen(3000, () => {console.log("corriendo")});