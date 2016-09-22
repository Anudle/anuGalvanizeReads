
var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var pg = require('pg');

/* GET home page. */

// Home Page
router.get('/', function(req, res, next) {
      res.render('index', { title: 'Galvanize Reads'});
   });

// Books List
   router.get('/books', function(req, res, next) {
     knex.select('*').from('book').then(function(data){
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
    knex('book').insert({title: req.body.title, genre: req.body.genre, description: req.body.description, cover: req.body.cover})
        .then(function(data){
        res.redirect('/books');
    });
});

// Delete Book

router.get('/:id/question-delete-book', function(req, res, next){
  knex('book').select().where({id: req.params.id}).then(function(data){
    res.render('deletebook', {data: data[0]});
  });
});

router.get('/:id/delete-book',function(req,res,next){
    knex('book').where({id: req.params.id}).del().then(function(data){
      res.redirect('/books');
    });
  });

// Edit Book

router.get('/:id/edit-book', function(req,res,next){
  knex('book').where({id: req.params.id}).then(function(data){
      res.render('editbook', {data: data[0]});
    });
});

router.post('/:id/edit-book',function(req,res,next){
    knex('book').where({id:req.params.id}).update(req.body).then(function(data){
      res.redirect('/books');
    });
});

//Author
router.get('/authors', function(req,res,next){
  knex('author').select().then(function(data){
    res.render('authors', {authors: data});
  });
});

router.get('/authors/:id', function(req,res,next){
  knex('author').where({id: req.params.id}).then(function(data){
      res.render('author', {data: data[0]});
    });
});

//Add Author
router.get('/add-author', function(req, res, next) {
    res.render('addauthor');
   });

router.post('/add-author',function(req,res,next){
 knex('author').insert({first_name: req.body.first_name, last_name: req.body.last_name, bio: req.body.bio, author_pic: req.body.author_pic})
     .then(function(data){
     res.redirect('/authors');
 });
});

// Edit Author
router.get('/:id/edit-author', function(req,res,next){
  knex('author').where({id:req.params.id}).then(function(data){
    res.render('editauthor', {data: data[0]});
  })
})

router.post('/:id/edit-author',function(req,res,next){
    knex('author').where({id:req.params.id}).update(req.body).then(function(data){
      res.redirect('/authors');
    });
});



//Delete Author
router.get('/:id/question-delete-author', function(req, res, next){
  knex('author').select().where({id: req.params.id}).then(function(data){
    res.render('deleteauthor', {data: data[0]});
  });
});

router.get('/:id/delete-author',function(req,res,next){
    knex('author').where({id: req.params.id}).del().then(function(data){
      res.redirect('/authors');
    });
  });



module.exports = router;
