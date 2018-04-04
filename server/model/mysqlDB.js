var mysql = require("mysql");
var config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'myData',
    port: 3306
};
var pool = mysql.createPool(config);

module.exports = {
    /**
     * @param options
     * options
     * sql : String
     * callback : 回调
     * @return
     * data
     * data : Array
     * status : Boolean
     */
    getTableCount: function (options, callback) {
        try {
            var data = {data: null, status: false};
            if (!options.sql)
                return;
            pool.getConnection(function(err, connection) {
                connection.query(options.sql, options.data, function (err, rows, fields) {
                    connection.release();
                    if (!err) {
                        callback && callback(rows);
                    } else {
                        console.log(`getTableCount：Error while performing Query. sql:${options.sql} error:${err}`);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * @param options
     * options
     * sql : String
     * callback : 回调
     * @return
     * data
     * data : Array
     * status : Boolean
     */
    getTableAllInfo: function (options, callback) {
        try {
            var data = {data: null, status: false};
            if (!options.sql)
                return;
            pool.getConnection(function(err, connection) {
                connection.query(options.sql, options.data, function (err, rows, fields) {
                    connection.release();
                    if (!err) {
                        data.data = rows;
                        data.status = true;
                        callback && callback(data);
                    } else {
                        console.log(`getTableAllInfo：Error while performing Query.sql:${options.sql}`);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * @param options
     * options
     * sql : String
     * callback : 回调
     * @return
     * data
     * data : Array
     * status : Boolean
     */
    getTableInfo: function (options, callback) {
        try {
            var data = {data: null, status: false};
            if (!options.sql)
                return;
            pool.getConnection(function(err, connection) {
                connection.query(options.sql, options.data, function (err, rows, fields) {
                    connection.release();
                    if (!err) {
                        data.data = rows;
                        data.status = true;
                        callback && callback(data);
                    } else {
                        console.log(`getTableInfo：Error while performing Query.sql:${options.sql}`);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * @param options
     * options
     * sql : String
     * data : data(user)
     * callback : 回调
     * @return
     * data
     * id : Number
     * status : Boolean
     */
    insertTable: function (options, callback) {
        try {
            var data = {data: null, status: false};
            if (!options.sql)
                return;
            pool.getConnection(function(err, connection) {   
                connection.query(options.sql, options.data, function (err, rows, fields) {
                    //释放连接  
                    connection.release();
                    if (!err) {
                        data.id = rows.insertId;
                        data.status = true;
                        callback && callback(data);
                    } else {
                        console.log(`insertTable：Error while performing Query.sql:${options.sql}`);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * @param options
     * options
     * sql : String
     * callback : 回调
     * @return
     * data
     * status : Boolean
     */
    deleteTable: function (options, callback) {
        try {
            var data = {data: null, status: false};
            if (!options.sql)
                return;
            pool.getConnection(function(err, connection) {
                connection.query(options.sql, function (err, rows, fields) {
                    //释放连接  
                    connection.release();
                    if (!err) {
                        data.status = true;
                        callback && callback(data);
                    } else {
                        console.log(`deleteTable：Error while performing Query.sql:${options.sql}`);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    },
    /**
     * @param options
     * options
     * sql : String
     * params : Array
     * callback : 回调
     * @return
     * data
     * status : Boolean
     */
    updateTable: function (options, callback) {
        try {
            var data = {data: null, status: false, message: ''};
            if (!options.sql)
                return;
            pool.getConnection(function(err, connection) {
                connection.query(options.sql, options.params, function (err, rows, fields) {
                    //释放连接  
                    connection.release();
                    if (!err) {
                        data.status = true;
                        data.message = "更新成功!";
                        callback && callback(data);
                    } else {
                        console.log(`updateTable：Error while performing Query.sql:${options.sql}`);
                    }
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
};