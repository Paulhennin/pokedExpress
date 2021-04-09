const { List, Pokemon} = require("../models");
const { associations } = require("../models/user");

const listController = {
    listPage: async (req,res) => {
        try {
            if(!req.session.user){
                res.redirect('/');
            };
            console.log(req.session);
            const lists = await List.findAll(
                {where : {user_id: req.session.user.id},include: ["pokemonsDeck"]},
                {include: "pokemonsDeck"}
                );
            console.log(lists);
            if(!lists.length){
                return res.render('mylist', {lists, message: "Vous n'avez aucune listes, faites en une !"});
            }
            res.render('mylist', {lists, message: "Vos listes sont :"});
        } catch (error) {
            return console.log(error);
        }
    },

    // Gestion Add / Suppr lists
    // START 
    newList: async (req,res) => {
        try {
            const newTeam = new List({
                name: req.body.name,
                user_id: req.session.user.id
            });
            await newTeam.save(); 
            res.redirect('mylist');
        } catch (error) {
            console.log(error)
        }
    },
    list: async (req,res) => {
        try {
            const pokedex = await Pokemon.findAll();
            const list = await List.findByPk(req.params.id, {
                include: [
                    'pokemonsDeck',
                    {
                        association: "pokemonsDeck",
                        include: ["types"],
                        through:"pokemons"
                    }
                ]
            });
            res.render('team', {list, pokedex});
        } catch (error) {
            console.log(error)
        }
    },
    deleteList: async (req,res) => {
        try {
            const id = req.params.id;
            const team = await List.findByPk(id);
            const deleteTeam =await team.getPokemonsDeck();
            for(const pokemon of deleteTeam) {
                pokemon.removeList(team)
            };
            await team.destroy();
            res.redirect('/mylist');
        } catch (error) {
            console.log(error)
        }
    },

        // Gestion Add / Suppr lists
        // END

        // Gestion Pokemon dans Lists
        // START

    addPokemon: async (req, res) => {
        try {
            const listId = Number(req.params.id);
            const pokemonId = req.body.pokemon_select;
            const newPokemon = await Pokemon.findByPk(pokemonId).then(pokemon => {
                pokemon.setLists(listId).then(result => {
                    res.redirect(`/team/${listId}`);
                })
            });
        } catch (error) {
            console.log(error);
        }
    },
    addInList: async (req,res) => {
        try {
            const pokemonId = Number(req.params.id);
            const teamId = req.body.team_select;
            const newPokemon = await Pokemon.findByPk(pokemonId).then(pokemon => {
                pokemon.setLists(teamId).then(result => {
                    res.redirect(`/team/${teamId}`);
                })
            });
        } catch (error) {
            console.log(error);
        }
    },
    deleteInList: async (req,res) => {
        try {
            const pokemonId = req.params.pokemon_id;
            const teamId = req.params.team_id;
            const deletePokemonInTeam = await Pokemon.findByPk(pokemonId, {}).then(pokemon => {
                pokemon.removeList(teamId).then(result => {
                    res.redirect(`/team/${teamId}`);
                })
            });
            await deleteTeam.destroy();
        } catch (error) {
            
        }
    }



};

module.exports = listController;