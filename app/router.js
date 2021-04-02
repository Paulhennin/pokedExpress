const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const listController = require('./controllers/listController');

const authController= require('./controllers/authController');
router.get('/', mainController.homePage);

router.get('/pokemon/:id', mainController.pokemonPage);
router.get('/type', mainController.typePage);
router.get('/type/:id', mainController.pokemonTypePage);

router.get('/signup', mainController.signupPage);
router.post('/signup', authController.signup);

router.get('/signin', mainController.signInPage);
router.post('/signin', authController.signIn);

router.get('/myprofile', mainController.myProfile);
router.get('/pokedex', mainController.pokedexPage)
router.use(mainController.notFound);

module.exports = router;