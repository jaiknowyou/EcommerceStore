var voucher_codes = require('voucher-code-generator')

class Cart{
    constructor(){
        //Storing all the item quantity in Cart by product Id as Key.
        this.items = {}
    }

    isEmpty = async()=>{
        return ((Object.entries(this.items).length == 0) ? true: false)
    }

    addItemToCart = async function(id, quantity){
        // Checking Availability in Inventory before adding to Cart
        let unavailablity = await CurrentInventory.checkInventory(id, quantity)
        if(unavailablity) {
            return unavailablity
        }
        if(this.items[id]) this.items[id] += quantity
        else this.items[id] = quantity
        return `The Item with id ${id} is Added.`
    }

    removeItemFromCart = async function(id, quantity){
        if(this.items[id]) {
            this.items[id] -= quantity
            if(this.items[id] < 1) delete this.items[id]
            return "Removed."
        }
        return "The Item is Not in Cart."
    }

    getCartDetails = async(update = false)=>{
        let res = {
            total: 0,
            count: 0
        }
        Object.entries(this.items).forEach(async(element) => {
            let id = parseInt(element[0])
            let val = element[1]
            // Checking Inventory before checking Out.
            let unavailablity = await CurrentInventory.checkInventory(id, val)
            let name = CurrentInventory.products[id].name
            if(unavailablity) {
                // If Item Unavailable, Sending the message back to client
                res[name] = unavailablity
                return res
            }
            res[name]={
                quantity: val,
                price: CurrentInventory.products[id].price,
                cost: CurrentInventory.products[id].price*val
            }
            if(update) {
                try{
                    // Updating Inventory
                    await CurrentInventory.updateProductInventory(parseInt(id), -val)
                    res[name]['message'] = "This Product would be delivered in some days"
                    delete this.items[`${id}`]
                }catch(e){
                    // In case Available Items not found or not updated in Inventory, rollback result count and total cost.
                    res['count']--
                    res['total'] -= res[name]['cost']
                    res[name]['message'] = "This Product is Sold Out."
                }
            }
            res['count']++
            res['total'] += res[name]['cost']
        })
        return res
    }

    // CheckOut - Order Creation
    generateInvoice = async function(discount = null){
        return new Promise(async(resolve, reject)=>{
            try{
                let empty = await this.isEmpty()
                // No CheckOut for Empty Cart
                if(empty) return resolve("Cart is Empty.")
                let res
                try{
                    res = await this.getCartDetails(true)
                }catch(e){
                    return reject(e)
                }
                
                if(discount){
                    res['discountCode'] = voucher_codes.generate({
                        pattern: "##-###-##",
                    })
                    res['discount'] = 0.1 * res['total']
                    res['total'] -= res['discount'] || 0
                }
                return resolve(res)
            }catch(e){
                return reject(e)
            }
        })
        
    }
}

module.exports = Cart