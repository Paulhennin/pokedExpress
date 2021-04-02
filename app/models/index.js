const Pokemon = require('./pokemon');
const User = require('./user');
const Type = require('./type');

Pokemon.belongsToMany(Type, {
    as: "types",
    through: 'pokemon_type',
    foreignKey: 'pokemon_numero',
    otherKey: 'type_id',
});

Type.belongsToMany(Pokemon, {
    as: "pokemons", 
    through: 'pokemon_type',
    foreignKey: 'type_id', 
    otherKey: 'pokemon_numero',
});


module.exports = { Type, Pokemon, User};