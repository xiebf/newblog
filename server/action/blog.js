var blog = require("../model/blog.js");

module.exports = function (app) {
    /**
     * 获取所有博客类型
     */
    app.get('/getTitles', function (req, res) {
        blog.getTitle(function (data) {
            res.send(data);
        });
    });
    /**
     * 获取博客类型下的所有内容
     */
    app.get('/getContentByType', function (req, res) {
        //参数校验
        if (!req.query.type) {
            res.send({
                data: [],
                message: "缺少字段类型type",
                status: false
            });
            return false;
        }
        let sql = "select id, type, content, create_time, update_time from blog_content where type = ? limit ?,?";
        let size = req.query.size ? req.query.size : 10;
        let page = req.query.page ? req.query.page : 1;
        let p1 = new Promise((resolve, reject) => {
            blog.getContentByType({
                sql: sql,
                data: [
                    req.query.type,
                    (page - 1)*size,
                    parseInt(size)
                ]
            }, function (data) {
                resolve(data);
            });
        });
        let countSql = "select count(*) as total from blog_content where type = ?";
        let p2 = new Promise((resolve, reject) => {
            blog.getContentCountByType({
                sql: countSql,
                data: [req.query.type]
            }, function (data) {
                resolve(data);
            });
        });
        Promise.all([p1, p2]).then((data) => {
            let d1 = data[0], d2 = data[1];
            res.send({
                status: true,
                data: d1.data,
                total: d2[0].total
            });
        }).catch((err) => {
            res.send({
                status: false,
                message: err
            });
        });
    });
    /**
     * 添加博客类型
     */
    app.post('/addBlogType', function (req, res) {
        //参数校验
        if (!req.body.type) {
            res.send({
                data: [],
                message: "缺少字段类型type",
                status: false
            });
            return false;
        }
        let sql = "insert into blog_type set create_time = now(), update_time = now(), ?";
        blog.addBlogType({
            sql: sql,
            data: {
                type: req.body.type
            }
        }, function (data) {
            res.send(data);
        });
    });
    /**
     * 修改博客类型
     */
    app.post('/updateBlogType', function (req, res) {
        //参数校验
        if (!req.body.id) {
            res.send({
                data: [],
                message: "缺少字段类型id",
                status: false
            });
            return false;
        }
        if (!req.body.type) {
            res.send({
                data: [],
                message: "type字段为空",
                status: false
            });
            return false;
        }
        let sql = "update blog_type set update_time = now(), type = ? where id = ?";
        blog.updateBlogType({
            sql: sql,
            params: [ req.body.type, req.body.id ]
        }, function (data) {
            res.send(data);
        });
    });
    /**
     * 添加博客内容
     */
    app.post('/addBlogContent', function (req, res) {
        console.log(req.body);
        //参数校验
        if (!req.body.title) {
            res.send({
                data: [],
                message: "缺少字段类型title",
                status: false
            });
            return false;
        }
        if (!req.body.content) {
            res.send({
                data: [],
                message: "缺少字段类型content",
                status: false
            });
            return false;
        }
        if (!req.body.type) {
            res.send({
                data: [],
                message: "缺少字段类型type",
                status: false
            });
            return false;
        }
        let sql = "insert into blog_content set create_time = now(), update_time = now(), ?";
        blog.addBlogContent({
            sql: sql,
            data: {
                title: req.body.title,
                content: req.body.content
            }
        }, function (data) {
            res.send(data);
        })
    });
    /**
     * 更新博客内容
     */
    app.post('/updateBlogContent', function (req, res) {
        //参数校验
        if (!req.body.id) {
            res.send({
                data: [],
                message: "缺少字段类型id",
                status: false
            });
            return false;
        }
        if (!req.body.type) {
            res.send({
                data: [],
                message: "缺少字段类型type",
                status: false
            });
            return false;
        }
        if (!req.body.title) {
            res.send({
                data: [],
                message: "缺少字段类型title",
                status: false
            });
            return false;
        }
        if (!req.body.content) {
            res.send({
                data: [],
                message: "缺少字段类型content",
                status: false
            });
            return false;
        }
        let sql = "update blog_content set update_time = now(), type = ?, title = ?, content = ? where id = ?";
        blog.updateBlogContent({
            sql: sql,
            params: [ req.body.id, req.body.type, req.body.tityle, req.body.content ]
        }, function (data) {
            res.send(data);
        })
    });
    /**
     * 删除博客
     */
    app.post('/deleteBlogById', function (req, res) {
        //参数校验
        if (!req.body.id) {
            res.send({
                data: [],
                message: "缺少字段类型id",
                status: false
            });
            return false;
        }
        let sql = "update blog_content set is_delete = 'true' where id = ?";
        blog.updateBlogContent({
            sql: sql,
            params: [ req.body.id ]
        }, function (data) {
            res.send(data);
        })
    });
};