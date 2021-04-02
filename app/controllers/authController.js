const User = require('../models/');
const bcrypt = require('bcrypt');

const authController = {
    signup : async (req,res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const cryptedPass = await bcrypt.hash(req.body.password, salt);
            const user = await User.findOne({where : {pseudo: req.body.pseudo} });
            if(user){
                return res.render('signup', {error: 'Un user possede deja ce pseudo'})
            }
            const newUser = new User({
                pseudo: req.body.pseudo,
                password: cryptedPass
            });

            await newUser.save();
            res.redirect('/');
        } catch (error) {
            res.status(500).send(e);
        }

    },

    signIn : async (req,res) => {
        try {
            console.log(req.body);
            const member = await User.findOne({where : {pseudo: req.body.pseudo} });
            if(!member){
                return res.render('signInPage', {error: "Aucun utilisateur en BDD"});
            }
            const passChecked = await bcrypt.compare(req.body.password, member.password);
            if(!passChecked){
                return res.render('signInPage', {error: 'Les mots de passes ne correspondent pas.'});
            }

            req.session.user = member;
            delete req.session.user.password;
            res.render('myProfile', { member : req.session.user});
        } catch (error) {
            res.status(500).send(e);
        }
    }
}

module.exports = authController;