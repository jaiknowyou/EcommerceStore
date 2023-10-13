var jwt = require('jsonwebtoken')
const CommonService = require('../Model/Common')
const User = require('../Model/User')

let usernames = []
let users = []
let AuthController = {}

AuthController.generateJWT = async(req, res)=>{
    try{
        let commonCheck = CommonService.commonCheck(req, ["username", "password"], 'body')
        if(commonCheck) return res.send(`Missing Parameter ---> ${commonCheck}`)
        let username = req.body.username
        // password salting and encryption by bcrypt, to store in DB
        // For in-memory functionality, we are using jwt login without password verification
        if(!users.includes(username)){
            usernames.push(username)
            users.push(new User(username))
        }
        return res.send(jwt.sign({user: username}, PRIVATE_KEY))
    }catch(e){
        console.log(e)
        return res.status(400).send(e.message)
    }
}

AuthController.verify = async(req, res, next)=>{
    try{
        let verify = jwt.verify(req.headers.token, PRIVATE_KEY)
        if(!verify) return res.send("Invalid or Expired Token.")
        let index = usernames.indexOf(verify.user)
        if(index == -1) return res.send("User Not Found.")
        req.user = users[index]
        next()
    }catch(e){
        console.log(e)
        return res.status(400).send(e.message)
    }
}

module.exports = AuthController