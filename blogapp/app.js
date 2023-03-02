//carregando módulos
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const admin = require('./rotes/admin')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash  = require('connect-flash')

//configurações
    //sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    //middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

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
