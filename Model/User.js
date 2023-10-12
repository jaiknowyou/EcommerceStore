class User{
    constructor(username){
        // this.id = id
        this.name = username
        // this.contact = contact
        this.cart = Cart()
        this.orders = []
    }

    checkOut = async function(Inventory){
        try{
            let discount = false
            if(this.orders.length + 1 == DISCOUNT_ON_N_ORDERS) discount = true
            let order = await this.cart.generateOrder(Inventory, discount)
            this.orders.push(order)
        }catch(e){
            console.log("User.checkout===>", e)
            return e
        }
    }
}

module.exports = User