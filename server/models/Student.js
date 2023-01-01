const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    studentid: {type: String},  //学号
    name: {type: String},      //姓名
    gender: {type: String},     //性别
    english: {type: Number},    //英语
    math: {type: Number},       //数学
    program: {type: Number},    //程序设计
    algorithm: {type: Number},  //数据结构
    sum: {type: Number}         //总分
})

module.exports = mongoose.model('Student', schema)