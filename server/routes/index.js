var express = require('express');
var router = express.Router();
var test = require('../model/test.js');
var blogAction = require('../action/blog.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/test', function (req, res) {
    test.getAllInfo(function (data) {
        res.send(data);
    });
});

blogAction(router);

module.exports = router;
