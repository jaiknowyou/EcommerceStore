const Inventory = require("../Model/Inventory")

let UserController = {}

// We have taken a default Inventory here.
// In Real Life Scenario, There can be multiple Inventories and approriate Inventories would be required to be searched
let CurrentInventory = Inventory('Bangalore')
CurrentInventory.insertProduct("A4 size Paper", "set of 100 paper smooth and white", 50, 100, CATEGORY.COPY)
CurrentInventory.insertProduct("Linc Ball Pen", "For Smooth Writing", 10, 70, CATEGORY.PEN)
CurrentInventory.insertProduct("Paras Pen", "Pack of 5 Pen", 10, 30, CATEGORY.PEN)
CurrentInventory.insertProduct("Classmate Copy", "150 Sustainable Pages", 30, 100, CATEGORY.COPY)

UserController.addToCart = (req, res)=>{
    try{
        let items = req.body.items
        for(let {key, value} in items){
            req.user.cart.addItemtoCart(key, value)
        }
    }catch(e){
        console.log("UserController.addToCart ==>", e)
        return res.status(400).send("Error")
    }
}

UserController.removeFromCart = (req, res)=>{
    try{
        let items = req.body.items
        for(let {key, value} in items){
            req.user.cart.removeItemFromCart(key, value)
        }
    }catch(e){
        console.log("UserController.removeItemFromCart ==>", e)
        return res.status(400).send("Error")
    }
}

UserController.getCartDetails = async(req, res)=>{
    try{
        let result = await req.user.cart.getCartDetails()
        return result
    }catch(e){
        console.log("UserController.getCartDetails ==>", e)
        return res.status(400).send("Error")
    }
}

UserController.checkOut = async(req, res)=>{
    try{
        let result = await req.user.checkOut(CurrentInventory)
        return result
    }catch(e){
        console.log("UserController.checkOut ==>", e)
        return res.status(400).send("Error")
    }
}

module.exports = UserController