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
require('./models/Postagens')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./rotes/usuario')
const passport = require('passport')
require('./config/auth')(passport)

//configurações
    //sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(flash())

    //middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
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
    app.get('/categorias', (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render('categorias/index', {categorias: categorias})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno ao listar as categorias!")
            res.redirect('/')
        })
    })

    app.get('/postagem/:slug', (req, res) => {
       Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
        if(postagem){
            res.render('postagem/index', {postagem: postagem})
        } else{
            req.flash("error_msg", "Essa postagem não existe!")
            res.redirect('/')
        }
       }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno!")
        res.redirect('/')
       })
    })

    app.get('/', (req, res) => {
        Postagem.find().populate('categoria').lean().then((postagens) => {
            res.render('index', {postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect('/404')
        })
        
    })

    app.get('/categorias/:slug', (req, res) => {
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
            if(categoria){
                Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
                    res.render('categorias/postagens', {postagens: postagens, categoria: categoria})
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro ao listar os posts")
                    res.redirect('/')
                })
            }else{
                req.flash("error_msg", "Esta categoria não existe!")
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect('/')
        })
    })

    app.get('/404', (req, res) => {
        res.send("Erro 404")
    })

    app.use('/admin', admin)
    app.use('/usuarios', usuarios)

//outros
const PORT = process.env.PORT || 8089
app.listen(PORT, function(){
    console.log(`Servidor rodando!`)
})
