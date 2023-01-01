const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {         //用户名
        type: String
    },
    password: {         //密码
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

module.exports = mongoose.model('AdminUser', schema)