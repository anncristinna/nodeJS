const mongoose = require("mongoose")

//configurando mongoose
mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost/aprendendo").then(function(){
    console.log("Funcionando!")
}).catch(function(erro){
    console.log(`Houve um erro: ${erro}`)
})

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number,
        require: true
    }, 
    pais: {
        type: String
    }
})

mongoose.model('usuarios', UsuarioSchema)

const Victor = mongoose.model('usuarios')

new Victor({
    nome: 'Victor',
    sobrenome: 'Lima',
    email: 'victorlima@gmail.com',
    idade: 27,
    pais: 'Braisl'
}).save().then(() => {
    console.log("Usuario criado com sucesso!")
}).catch((err) => {
    console.log(`Houve um erro: ${err}`)
})