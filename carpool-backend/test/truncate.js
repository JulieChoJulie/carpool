
const map = require('lodash/map');
const db = require('../models');

module.exports = function truncate() {
    return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
        .then(function(result){
            return db.sequelize.sync({force: true});
        }).then(function(){
        return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    }).catch(function(err){
        res.json({isError : true, status: err.message});
    });
}
