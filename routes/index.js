
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Galvanize Reads'});
   });

  //  router.get('/books', function(req, res, next) {
  //    knex('author').innerJoin('author_book', 'author_id', 'author.id').innerJoin('book','book_id', 'book.id').select('author_book.id as author_book_id','author.id as authors_id', 'book.id as books_id' ,'*').then(function(data){
  //        res.render('books', { book: data });
  //    });
  //  });

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

   router.get('/books-add', function(req, res, next) {
       res.render('addbook');
      });

  router.post('/books-add',function(req,res,next){
    knex('book').insert({title: req.body.title, genre: req.body.genre, cover: req.body.cover, description: req.body.description})
        .then(function(data){
        res.redirect('/books');
    });
});



module.exports = router;
