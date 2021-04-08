const express = require('express');
const router = express.Router();


const mainController = require('./controllers/mainController');
const listController = require('./controllers/listController');
const searchController = require('./controllers/searchController');

const authController= require('./controllers/authController');

router.get('/', mainController.homePage);

// Route de connexion / inscription

router.get('/signup', mainController.signupPage);
router.post('/signup', authController.signup);

router.get('/signin', mainController.signInPage);
router.post('/signin', authController.signIn);

// Check présence utilisateur avec redirection vers connexion
const userMiddleware = require('./middlewares/user');
router.use(userMiddleware);

// accès au profil, au pokedex, types ET a un pokemon
router.get('/myprofile', mainController.myProfile);
router.get('/pokedex', mainController.pokedexPage);
router.get('/pokemon/:id', mainController.pokemonPage);
router.get('/types', searchController.typesList);
router.get('/type/:id', searchController.searchByType);

// Route Liste des Teams

router.get('/mylist', listController.listPage);

// Route Gestion des Teams

router.post('/mylist', listController.newList);
router.post('/mylist/:id',listController.deleteList);
router.get('/team/:id', listController.list);

// Route Gestion des pokemons dans une Team

router.post('/team/:id', listController.addPokemon);
router.post('/team/add/:id', listController.addInList);
// router.delete('/team/delete/:id', listController.deleteInList)

router.use(mainController.notFound);

module.exports = router;