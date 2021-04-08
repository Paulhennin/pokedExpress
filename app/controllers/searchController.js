const {Type} = require('../models');
const {List} = require('../models');


const searchController = {
    typesList: async (req,res) => {
        const types = await Type.findAll();
        res.render('type', {types});
    },
    searchByType: async (req, res) => {
        const id = req.params.id
        const type = await Type.findByPk(id,{ include: "pokemons"});
        const lists = await List.findAll(
            {where : {user_id: req.session.user.id}}
            );
        res.render('searchByType', {type, lists});
    }
}

module.exports = searchController