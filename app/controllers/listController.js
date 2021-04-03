const { List } = require("../models");

const listController = {
    listPage: async (req,res) => {
        try {
            if(!req.session.user){
                res.redirect('/');
            };
            console.log(req.session);
            const lists = await List.findAll(
                {where : {user_id: req.session.user.id}}
            );
            if(!lists){
                console.log('coucou');
                res.render('mylist', {message: "Vous n'avez aucune listes, faites en une !"});
            }
            console.log(lists);
            res.render('mylist', {lists, message: "Vos listes sont :"});
        } catch (error) {
            return console.log(error);
        }
    }
};

module.exports = listController;