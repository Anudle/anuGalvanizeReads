
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('author').innerJoin('author_book', 'author_id', 'author.id').innerJoin('book','book_id', 'book.id').select('author_book.id as author_book_id','author.id as authors_id', 'book.id as books_id' ,'*').then(function(data){
      res.render('index', { book: data });
  });
});

router.get('/books', function(req, res, next) {
  knex('book').then(function(data){
    res.render('books', { title: 'Books',
                          data: data});
   });
})



module.exports = router;
