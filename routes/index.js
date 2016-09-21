var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var pg = require('pg');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'galvanize' });
});

router.get('/books', function(req, res, next) {
  knex('book').then(function(data){
    res.render('books', { title: 'Books',
                          data: data});
   });
})

router.get('/book-data/:id', function(req, res, next) {
  knex('book').where({id:req.params.id}).then(function(data){
  res.render('books-data', {title: 'Books-data',
                            data: data[0]});
    });
});


module.exports = router;
