const Inventory = require("../Model/Inventory")
require('../Config/config')
let UserController = {}

// We have taken a default single Inventory of location 'Bangalore' here.
// In Real Life Scenario, There can be multiple Inventories and 
// approriate Inventories would be required to be searched or 
// a global Inventory can be made to store data of all the inventories.
global.CurrentInventory = new Inventory('Bangalore')
CurrentInventory.insertProduct("A4 size Paper", "set of 100 paper smooth and white", 50, 100, CATEGORY.COPY)
CurrentInventory.insertProduct("Linc Ball Pen", "For Smooth Writing", 10, 70, CATEGORY.PEN)
CurrentInventory.insertProduct("Paras Pen", "Pack of 5 Pen", 10, 30, CATEGORY.PEN)
CurrentInventory.insertProduct("Classmate Copy", "150 Sustainable Pages", 30, 100, CATEGORY.COPY)

UserController.addToCart = async(req, res)=>{
    try{
        let result = {}
        let items = req.body.items
        for(let key in items){
            key = parseInt(key)
            if(key == NaN) continue
            result[key] = await req.user.addToCart(key, items[key])
        }
        return res.send(result)
    }catch(e){
        console.log("UserController.addToCart ==>", e)
        return res.status(400).send("Error")
    }
}

UserController.removeFromCart = async(req, res)=>{
    try{
        let result = {}
        let items = req.body.items
        for(let key  in items){
            key = parseInt(key)
            result[key] = await req.user.removeFromCart(key, items[key])
        }
        return res.send(result)
    }catch(e){
        console.log("UserController.removeItemFromCart ==>", e)
        return res.status(400).send("Error")
    }
}

UserController.getCartDetails = async(req, res)=>{
    try{
        let result = await req.user.getCartDetails()
        return res.send(result)
    }catch(e){
        console.log("UserController.getCartDetails ==>", e)
        return res.status(400).send("Error")
    }
}

UserController.checkOut = async(req, res)=>{
    try{
        let result = await req.user.checkOut()
        return res.send(result)
    }catch(e){
        console.log("UserController.checkOut ==>", e)
        return res.status(400).send("Error")
    }
}

// List of Products available in Inventory
UserController.products = async(req, res)=>{
    try{
        let result = `Inventory(${CurrentInventory.location}):\n`
        let products = await CurrentInventory.productDescriptionByCategory()
        return res.send(result+products)
    }catch(e){
        console.log("UserController.products ==>", e)
        return res.status(400).send("Error")
    }
}

module.exports = UserController