var jwt = require('jsonwebtoken')
const CommonService = require('../Models/Common')

let usernames = []
let users = []
let AuthController = {}

AuthController.generateJWT = async(req, res)=>{
    try{
        let commonCheck = CommonService.commonCheck(req, ["username", "password"], 'body')
        if(commonCheck) return res.send(`Missing Parameter ---> ${commonCheck}`)
        // password salting and encryption by bcrypt, to store in DB
        // For in-memory functionality, we are using jwt login without password verification
        return res.send(jwt.sign({user:req.body.username}, PRIVATE_KEY))
    }catch(e){
        console.log(e)
    }
}

AuthController.verify = async(req, res, next)=>{
    try{
        let verify = jwt.verify(req.headers.token, PRIVATE_KEY)
        if(!verify) return res.send("Invalid or Expired Token.")
        next()
        let index = users.indexOf(verify.user)
        if(index == -1) return res.send("User Not Found.")
        req.user = users[index]
    }catch(e){
        console.log(e)
    }
}

module.exports = AuthController