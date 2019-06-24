const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');


// Get All Articles
router.get('/article', (req, res) => {
    const query = 'CALL getAllArticles()';
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// Get Article By Id
router.get('/article/search/id/:id', (req, res) => {
    const { id } = req.params;
    const query = 'CALL getArticleById(?)';
    
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err){
            if(rows[0].length == 0){

                const errorResponse = [{
                    ResponseCode: 1, 
                    ResponseMessage: "Article(s) not found!"
                }];
                res.json(errorResponse);
                
            } else {
                res.json(rows[0]);
            }
        } else {
            console.log(err);
        }
    });
});

// Get Articles By Authors Ids
router.get('/article/search/authors_ids/:string_authors_ids', (req, res) => {
    const { string_authors_ids } = req.params;

    const query = `CALL getArticleByAuthorIds(?)`;

    mysqlConnection.query(query, [string_authors_ids], (err, rows, fields) => {
        if(!err){
            if(rows[0].length == 0){
                const errorResponse = [{
                    ResponseCode: 1, 
                    ResponseMessage: "Article(s) not found!"
                }];
                res.json(errorResponse);
            } else {
                res.json(rows[0]);
            }
        } else {
            console.log(err);
        }
    });
});

// Insert A New Article
router.post('/article/new', (req, res) => {

    const { title, short_description, long_description, authors_ids } = req.body;
    const query = `CALL addOrEditArticle(0, ?, ?, ?, ?)`;

    mysqlConnection.query(query, [title, short_description, long_description, authors_ids], (err, rows, fields) => {
       if(!err) {
           console.log("row: " + rows[0]);
           //res.json({Status: "Article inserted successfully!"})
           res.json(rows[0]);
       } else {
           console.log(err);
       }
    });
});


// Update an Article
router.put('/article/edit/:id', (req, res) => {
    const { title, short_description, long_description, authors_ids } = req.body;
    const { id } = req.params;
    const query = `CALL addOrEditArticle(?, ?, ?, ?, ?)`;

    mysqlConnection.query(query, [id, title, short_description, long_description, authors_ids], (err, rows, fields) => {
        if(!err) {
            res.json([{
                ResponseCode: 0, 
                ResponseMessage: "Article updated successfully!"
            }]);
        } else {
            console.log(err);
        }
     });

});

// Delete an Article
router.delete('/article/delete/id/:id', (req, res) => {
    const { id } = req.params;
    const query = `CALL deleteArticle(?)`;

    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err){
            res.json([{
                ResponseCode: 0, 
                ResponseMessage: "Article updated successfully!"
            }])
        } else {
            console.log(err);
        }
    });
});

// Get All Authors
router.get('/author', (req, res) => {
    const query = 'SELECT * FROM authors';
    mysqlConnection.query(query, (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Get Author By Id
router.get('/author/search/id/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM authors WHERE id = ?';
    
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if(!err){
            //if(rows[0].length == 0){
                if(rows[0] == null){
                res.json([{
                    ResponseCode: 1, 
                    ResponseMessage: "Author not found!"
                }]);
            } else {
                res.json(rows);
            }
        } else {
            console.log(err);
        }
    });
});

module.exports = router;