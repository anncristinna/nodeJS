//carregando módulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
//const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//configurações

//rotas

//outros
const PORT = 8081
app.listen(PORT, function(){
    console.log(`Servidor rodando!`)
})
