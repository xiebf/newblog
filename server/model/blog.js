let mysqlDB = require('./mysqlDB.js');
let sql = null;

module.exports = {
    /**
     * 获取所有博客类型
     * @param {*} callback 
     */
    getTitle(callback){
        let sql = 'select id, type, create_time, update_time from blog_type';
        mysqlDB.getTableAllInfo({sql: sql}, callback);
    }
    /**
     * 通过类型获取内容
     * @param {*} data, callback 
     */
    ,getContentByType(data, callback){
        mysqlDB.getTableInfo(data, callback);
    }
    /**
     * 通过类型获取内容总条数
     * @param {*} data, callback
     */
    ,getContentCountByType(data, callback){
        mysqlDB.getTableCount(data, callback);
    }
    /**
     * 修改类型
     * @param {*} data, callback 
     */
    ,updateBlogType(data, callback){
        mysqlDB.updateTable(data, callback);
    }
    /**
     * 添加一个类型
     * @param {*} data, callback 
     */
    ,addBlogType(data, callback){
        mysqlDB.insertTable(data, callback);
    }
    /**
     * 添加一篇博客（增）
     */
    ,addBlogContent(data, callback){
        mysqlDB.insertTable(data,callback);
    }
    /**
     * 更新一篇博客（删改）
     */
    ,updateBlogContent(data, callback){
        mysqlDB.updateTable(data, callback);
    }
};