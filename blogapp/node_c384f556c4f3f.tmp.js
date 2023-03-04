//carregando módulos
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
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
    const hbs = exphbs.create({
        defaultLayout: 'main', 
        extname: 'handlebars',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
      })
  
  
      app.engine('handlebars', hbs.engine)
      app.set('view engine', 'handlebars')
      app.set('views', 'views')

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
