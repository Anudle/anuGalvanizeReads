
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */

// Home Page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Galvanize Reads'});
   });

// Books List
   router.get('/books', function(req, res, next) {
     knex('book').select('*').then(function(data){
         res.render('books', { book: data });
     });
   });

   router.get('/books/:id', function(req,res,next){
     knex('book').where({id: req.params.id}).then(function(data){
         res.render('book', {data: data[0]});
       });
   });

// Add Books
   router.get('/books-add', function(req, res, next) {
       res.render('addbook');
      });

  router.post('/books-add',function(req,res,next){
    knex('book').insert({title: req.body.title, genre: req.body.genre, cover: req.body.cover, description: req.body.description})
        .then(function(data){
        res.redirect('/books');
    });
});

// Delete Book
router.get('/:id/book-info', function(req,res,next){
  knex('book').where({id: req.params.id}).then(function(data){
      res.render('deletebook', {data: data[0]});
    });
});
router.post('/:id/book-info',function(req,res,next){
    knex('book').where({id:req.params.id}).update(req.body).then(function(data){
      res.redirect('/');
    });
});


module.exports = router;
