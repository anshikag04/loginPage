const express = require('express')
const app = express()

app.use(express.urlencoded({extended:false}))
const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/authentication", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(
        () => console.log("MongoDB connected."),
        (err) => console.log(err)
    )
const userModel = require('./model/user')

app.post('/register', (req,res) => {
    var userName = req.body.userName
    var password = req.body.password
    var fullName = req.body.fullName
    new userModel({userName, password, fullName }).save().then(registeredUser => {
        if(registeredUser) {
            res.send({
                message : "done",
                registeredUser
            })
        }
    })
})

app.post('/login', (req,res) => {
    var userName = req.body.userNames
    var password = req.body.password
    userModel.findOne({userName}).then((userFound)=> {
    if(userFound) {
        if(userFound.password ==password){
            res.send({
                message : "done",
                userFound
            })
        }
        else {
            res.send({message:'Password Incorrect!'})
        }
    }
    else {
        res.send({message : 'User Not Found.'})
    }
    })
})

app.listen(3000, () => {
    console.log("We're Listening!")
})