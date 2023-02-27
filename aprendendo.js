const mongoose = require("mongoose")

//configurando mongoose
mongoose.Promise = global.Promise
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost/aprendendo").then(function(){
    console.log("Funcionando!")
}).catch(function(erro){
    console.log(`Houve um erro: ${erro}`)
})