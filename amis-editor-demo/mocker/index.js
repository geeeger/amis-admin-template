const fs = require('fs')
const glob = require('glob')
module.exports = {
    '/api/schema/list': (req, res) => {
        return new Promise((resolve) => {
            glob("../**/*.schema.json", {}, (err, files) => {
                console.log(files)
                if (err) {
                    resolve(res.json({
                        status: 1,
                        msg: 'error'
                    }))
                }
                else {
                    resolve(res.json({
                        status: 0,
                        data: {
                            options: files
                        },
                        msg: 'ok'
                    }))
                }
            })
        })
    },
    '/api/schema/select': (req, res) => {
        return Promise.resolve(res.json({
            status: 0,
            data: require('../' + req.query.select),
            msg: 'ok'
        }))
    },
    '/api/schema/save': (req, res) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(req.body.path, JSON.stringify(req.body.schema), (err) => {
                if (err) {
                    reject(err)
                }
                resolve(res.json({
                    status: 0,
                    msg: ''
                }))
            })
        })
    }
}