const Type = require('../models/type');

const searchController = {
    typesList: async (req,res) => {
        const types = await Type.findAll();
        res.render('type', {types});
    },
    searchByType: async (req, res) => {
        const id = req.params.id
        const type = await Type.findByPk(id,{ include: "pokemons"});
        res.render('searchByType', {type});
    }
}

module.exports = searchController