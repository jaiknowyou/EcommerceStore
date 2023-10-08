class Cart{
    constructor(User){
        this.items = {}
    }

    addItemtoCart = function(id, quantity){
        if(this.items.id) this.items.id += quantity
        else this.items[id] = quantity
    }

    getCartDetails = function(Inventory){
        let res = {}
    }

    generateOrder = async function(Inventory, discount = null){
        new Promise(async(resolve, reject)=>{
            try{
                let total = 0
                let res = {}
                try{
                    for(let key in this.items){
                        res[id] = Inventory.searchProduct(id)
                        await Inventory.addOrRemoveProduct(key, this.items[key])
                        total += res[id].price * this.items[key]
                    }
                }catch(e){
                    return reject(e)
                }
                if(discount) res[discount] = 0.1 * total
                genearateInvoice(res)
                return resolve(res)
            }catch(e){
                return reject(e)
            }
        })
        
    }
}