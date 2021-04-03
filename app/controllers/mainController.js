const Pokemon = require('../models/pokemon');


const mainController = {

    homePage: async(req, res) => {
        try {
            res.render('index');
            return console.log("I'm On !");
        } catch (error) {
            return res.status(500).send(e);
        }
    },
    pokedexPage: async (req, res) => {
        const pokemons = await Pokemon.findAll({include: ["types"]});
        res.render('pokedex', {pokemons});
    },

    pokemonPage: async (req, res) => {
        const id = req.params.id;
        const pokemon = await Pokemon.findByPk(id, {include: "types"});
        console.log(pokemon);
        res.render('pokemon', {pokemon});
    },

    signupPage: (req,res) => {
        res.render('signupPage');
    },

    signInPage: (req,res) => {
        res.render('signInPage');
    },

    myProfile: (req,res) => {
        if(!req.session.user){
           return res.redirect('/');
        }
        res.render('myProfile', {member: req.session.user});
    },

    notFound: (request, response) => {
        
        console.debug('mainController notFound');

        response.status(404).render('error', { error: 404, message: 'Page introuvable' });
    }

};

module.exports = mainController;