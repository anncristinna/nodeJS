const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categorias = mongoose.model("categorias") //anotar

router.get('/', (req, res) => {
    res.render("admin/index.handlebars")
})

router.get('/posts', (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', (req, res) => {
    Categorias.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        res.flash("error_msg", "Houve um erro ao listar as categorias!")
        res.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    var erros = []

    if(!req.body.nome){
         erros.push({texto: "Nome inválido"})
    }
    if(!req.body.slug){
        erros.push({texto: "Slug inválido"})
    }
    if(req.body.nome.length < 2 ){
        erros.push({texto: "Nome muito pequeno!"})
    }
    if(erros.length > 0){
        res.render('admin/addcategorias', {erros: erros})
    } else {
        const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }
    new Categorias(novaCategoria).save().then(() => {
        req.flash("success_msg", "Categoria criada com sucesso")
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao salvar a categoria")
        res.redirect('/admin')
    })
    }
    
})

router.get('/categorias/edit/:id', (req, res) => {
        Categorias.findOne({_id: req.params.id}).lean().then((categoria) => {
            res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Categoria não encontrada!")
        res.redirect('/admin/categorias')
    })
        })

    router.post('/categorias/edit', (req, res) => {
        Categorias.findOne({_id: req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash("success_msg", "Categoria ediatada com sucesso!")
                res.redirect('/admin/categorias')
            }).catch((err) => {
                req.flash("error_msg", "Falha ao editar categoria!")
                res.redirect('/admin/categorias')
            })
        })
})
    

module.exports = router