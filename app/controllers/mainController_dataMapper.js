const dataMapper = require('../dataMapper.js');

const mainController = {
    homePage: (req, res) => {
        dataMapper.getAllCards( (err, results) => {
        if(err) {
            console.error(err);
            return;
        } else {
            res.render('index', {
                cards: results.rows,
                title: 'Liste des cartes'
            })
        }
        });
      },
    showPokemon: (req, res) => {
        const id= req.params.id;
        dataMapper.showPokemon(id, (err, results) => {
            if(err) {
                console.error(err);
                return;
            } 
            else {
                dataMapper.pokemonType(id, (err, types) => {
                    if(err) {
                        console.error(err);
                        return;
                    } else {
                        res.render('pokemon', {
                            pokemon: results,
                            types
                        })
                    }    
                })
            }
        })
    },
    listPage: (req, res) => {
        res.render('list');
    },

    typesPage: (req,res) => {
        res.render('types');
    }

};
module.exports = mainController;