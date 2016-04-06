var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');
var menuController    = require('../controllers/menu');
var token             = require('./token_auth');

// root path:
router.get('/', welcomeController.index);

// users resource paths:
router.get('/users',     usersController.index);
router.get('/users/:id', usersController.show);
router.post('/api/users', usersController.create);
router.get('/users/me', usersController.me);

router.post('/api/tokens', token.create);

// menu resource paths:
router.get('/menu', menuController.index);

module.exports = router;
