const mongoose= require('mongoose');

const conexionDB= async() => {
    try{
        const con= await mongoose.connect('mongodb+srv://alvaro:alvaro@cluster0.dyxtj.mongodb.net/DiagramadorDB', {
            
        })

        console.log("Conectado a la DB");
        
    }catch(err){
        console.log(err);
    }
}


module.exports= conexionDB;