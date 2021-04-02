const Pokemon = require('./pokemon');
const User = require('./user');
const Type = require('./type');
const List = require('./list');


User.hasMany(List, {
    foreignKey: "list_id",
    as: "lists"
});

List.belongsTo(User, {
    foreignKey: "user_id",
    as: "users"
});

Pokemon.belongsToMany(Type, {
    as: "types",
    through: "pokemon_has_type",
    foreignKey: "pokemon_id",
    otherKey: "type_id"
});

Type.belongsToMany(Pokemon, {
    as: "pokemons",
    through: "pokemon_has_type",
    foreignKey: "type_id",
    otherKey: "pokemon_id"
});

List.belongsToMany(Pokemon, {
    as: "pokemonsDeck",
    through: "list_has_pokemon",
    foreignKey: "list_id",
    otherKey: "pokemon_id"
});

Pokemon.belongsToMany(List, {
    as: "lists",
    through: "list_has_pokemon",
    foreignKey: "pokemon_id",
    otherKey: "list_id"
});


module.exports = {Type, Pokemon, User, List};