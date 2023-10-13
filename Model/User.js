const Cart = require("./Cart")

class User{
    constructor(username){
        // this.id = id
        this.name = username
        // this.contact = contact
        this.cart = new Cart()
        this.orders = []
    }

    addToCart = async function(id, quantity){
        return (await this.cart.addItemToCart(id, quantity))
    }

    removeFromCart = async function(id, quantity){
        return (await this.cart.removeItemFromCart(id, quantity))
    }

    getCartDetails = async function(){
        let res = await this.cart.getCartDetails()
        return res
    }

    emptyCart = async()=>{
        this.cart.items = {}
    }

    checkOut = async function(){
        try{
            let discount = false
            if((this.orders.length + 1) % DISCOUNT_ON_N_ORDERS == 0) discount = true
            let order = await this.cart.generateInvoice(discount)
            this.orders.push(order)
            if(discount) order['coupon'] = `Hurray, You got 10% discount. On every ${DISCOUNT_ON_N_ORDERS} purchase, get the discount.`
            return order
        }catch(e){
            console.log("User.checkout===>", e)
            return e
        }
    }
}

module.exports = User