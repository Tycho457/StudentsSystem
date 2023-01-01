module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Student = require('../../models/Student')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')

    //添加学生接口
    router.post('/students', async (req, res) => {
        const isexist = await Student.find({
            studentid: req.body.studentid
        })
        if (isexist != '') {
            res.status(422).send({
                message: '该生已存在！'
            })
        } else {
            const model = await Student.create(req.body)
            res.send(model)
        }
    })
    //更新学生信息接口
    router.put('/students/:id', async (req, res) => {
        const model = await Student.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除学生信息接口
    router.delete('/students/:id', async (req, res) => {
        await Student.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //查询学生接口
    router.post('/query', async (req, res) => {
        if (req.body.method == '学号') {
            const isexist = await Student.find({
                studentid: req.body.name
            })
            if (isexist != '') {
                res.send(isexist)
            } else {
                res.status(422).send({
                    message: '查找不到该学生！'
                })
            }
        } else {
            const isexist = await Student.find({
                name: req.body.name
            })
            if (isexist != '') {
                res.send(isexist)
            } else {
                res.status(422).send({
                    message: '查找不到该学生！'
                })
            }
        }
    })
    //获取学生信息接口
    router.get('/students', async (req, res) => {
        const items = await Student.find().limit(10)
        res.send(items)
    })
    //编辑页获取学生信息接口
    router.get('/students/:id', async (req, res) => {
        const model = await Student.findById(req.params.id)
        res.send(model)
    })

    //添加管理员接口
    router.post('/admin_user', async (req, res) => {
        const isexist = await AdminUser.find({
            username: req.body.username
        })
        if (isexist != '') {
            res.status(422).send({
                message: '该管理员已经存在！'
            })
        } else {
            const model = await AdminUser.create(req.body)
            res.send(model)
        }
    })
    //获取管理员信息接口
    router.get('/admin_user', async (req, res) => {
        const items = await AdminUser.find().limit(10)
        res.send(items)
    })
    //更新管理员信息接口
    router.put('/admin_user/:id', async (req, res) => {
        const model = await AdminUser.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除管理员信息接口
    router.delete('/admin_user/:id', async (req, res) => {
        await AdminUser.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //编辑页获取学生信息接口
    router.get('/admin_user/:id', async (req, res) => {
        const model = await AdminUser.findById(req.params.id)
        res.send(model)
    })

    //登录请求接口
    router.post('/login', async (req, res) => {
        const { username, password } = req.body
        //1.根据用户名找用户
        const user = await AdminUser.findOne({username}).select('+password')
        if(!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        //2.校验密码
        const isVaild = require('bcrypt').compareSync(password, user.password)
        if(!isVaild) {
            return res.status(422).send({
                message: '密码错误'
            })
        }
        //3.返回回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({ id: user._id}, app.get('secret'))
        res.send({ token })
    })
    app.use('/admin/api', router)
}