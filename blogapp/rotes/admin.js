const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categorias = mongoose.model("categorias") //anotar
require('../models/Postagens')
const Postagem = mongoose.model("postagens")
const {eAdmin} = require("../helpers/eAdmin")

router.get('/', (req, res) => {
    res.render("admin/index.handlebars")
})

router.get('/posts', eAdmin, (req, res) => {
    res.send("Página de posts")
})

router.get('/categorias', eAdmin, (req, res) => {
    Categorias.find().lean().then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        res.flash("error_msg", "Houve um erro ao listar as categorias!")
        res.redirect('/admin')
    })
})

router.get('/categorias/add', eAdmin, (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', eAdmin, (req, res) => {
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

router.get('/categorias/edit/:id', eAdmin, (req, res) => {
        Categorias.findOne({_id: req.params.id}).lean().then((categoria) => {
            res.render('admin/editcategorias', {categoria: categoria})
    }).catch((err) => {
        req.flash("error_msg", "Categoria não encontrada!")
        res.redirect('/admin/categorias')
    })
        })

    router.post('/categorias/edit', eAdmin, (req, res) => {
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

router.post('/categorias/deletar', eAdmin, (req, res) => {
    Categorias.deleteOne({_id: req.body.id}).then(() => {
        req.flash("sucess_msg", "Categoria deletada com sucesso")
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash("error_msg", "Erro ao deletar categoria!")
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', eAdmin, (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render('admin/postagens', {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", "Error ao exibir postagens!")
        res.redirect('admin/postagens/add')
    })
    
})

router.get('/postagens/add', eAdmin, (req, res) => {
    Categorias.find().lean().then((categorias) => {
        res.render('admin/postagensadd', {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Não há categoria registada!")
    })
})

router.post('/postagens/nova', eAdmin, (req, res) => {
    let erros = []

    if(!req.body.titulo || typeof req.body.titulo == "undefined" || req.body.titulo == "null"){
        erros.push({texto: "Campo de títuloo vazio!"})
    }

    if(!req.body.descricao || typeof req.body.descricao == "undefined" || req.body.descricao == "null"){
        erros.push({texto: "Campo de descrição vazio!"})
    }

    if(!req.body.slug || typeof req.body.slug == "undefined" || req.body.slug == "null"){
        erros.push({texto: "Campo de slug vazio!"})
    }

    if(!req.body.conteudo || typeof req.body.conteudo == "undefined" || req.body.conteudo == "null"){
        erros.push({texto: "Campo de conteudo vazio!"})
    }

    if(req.body.categoria == "0"){
        erros.push({texto: "Nenhuma categoria registrada!"})
    }

    if(erros.length > 0){
        res.render('admin/postagensadd', {erros: erros})
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            slug: req.body.slug,
            categoria: req.body.categoria,
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash("error_msg", "Não foi possível criar postagem!")
            res.redirect('/admin/postagens')
        })
    }
})

router.get('/postagens/edit/:id', eAdmin, (req, res) => {
   Postagem.findOne({_id: req.params.id}).lean().populate('categoria').then((postagens) => {
        Categorias.find().lean().then((categorias) => {
            res.render('admin/editpostagens', {categorias: categorias, postagens: postagens})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao listar as categorias!")
            res.redirect('/admin/postagens')
        })
   }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao carregar o formulário de edição!")
    res.redirect('/admin/postagens')
   })
})

router.post('/postagens/edit', eAdmin, (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash("success_msg", "Postagem editada com sucesso!")
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash("error_msg", "Erro interno")
            res.redirect('/admin/postagens')
        })
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro na edição" + err)
        res.redirect('/admin/postagens')
    })
})

router.post('/postagens/deletar', eAdmin, (req, res) => {
    Postagem.deleteOne({_id: req.body.id}).then(() => {
        req.flash("success_msg", "Postagem deletada com sucesso!")
        res.redirect('/admin/postagens')
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao eletar postagem!")
        res.redirect('/admin/postagens')
    })
})

module.exports = router