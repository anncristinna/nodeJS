//carregando módulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const admin = require('./rotes/admin')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

//configurações
    //body-parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //public
    app.use(express.static(__dirname + '/public'))

    //mongosse 
    mongoose.Promise = global.Promise
    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb://localhost/blogapp').then(() => {
        console.log("Banco de dados conectado!")
    }).catch((err) => {
        console.log(`Erro ao se conectar com banco de dados: ${err}`)
    })

//rotas
    app.use('/admin', admin)
//outros
const PORT = 8081
app.listen(PORT, function(){
    console.log(`Servidor rodando!`)
})
