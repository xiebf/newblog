let mysqlDB = require('./mysqlDB.js');
let sql = null;

module.exports = {
    getAllInfo(callback){
        let sql = 'select * from user';
        mysqlDB.getTableAllInfo({sql: sql}, callback);
    }
};