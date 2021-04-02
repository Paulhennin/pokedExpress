const dataMapper = require('../dataMapper.js');

const searchController = {
    searchList: (req,res) => {
        dataMapper.searchTypes((err, results) => {
            if(err) {
                console.error(err);
                return;
            } else {
                res.render('searchPage', {types:results.rows});
            }
        })
    },
    searchType: (req, res) => {
        const id= req.params.id;
        dataMapper.searchByType(id ,(err, results) => {
            if(err) {
                console.error(err);
                return;
            } else {
                let type = {};
                if(results[0]){
                    type.name = results[0].name;
                    type.color = results[0].color;
                }
                res.render('searchByType', {cards:results, type});
            }
        })
    }
}

module.exports = searchController;