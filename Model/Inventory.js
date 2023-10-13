const Product = require("./Product")

class Inventory{
    constructor(location){
        this.products = []
        this.mapping = new Map()
        // Use Array for small and fixed product set amd to filter Products easily
        // Use Map for large data keeping quantity and product details
        // RDBMS for searching and filtering
        this.quantity = []
        this.location = location
    }

    checkInventory = async(key, value)=>{
        if(key >= this.products.length) return "This Product is Not in Inventory"
        if(this.quantity[key] < value) return `Only ${this.quantity[key]} of product ${this.products[key].name} is available.`
    }

    updateProductInventory = function(id, quantity){
        return new Promise((resolve, reject)=>{
            try{
                if(id >= this.products.length) return reject("This Product is not found in Inventory")
                if(quantity < 0 && -quantity > this.quantity[id]) return reject(`Only ${this.quantity[id]} of product ${this.products[id].name} is available.`)
                this.quantity[id] += quantity
                resolve()
            }catch(e){
                console.log(e)
                return reject(e)
            }
        })
        
    }

    searchProduct = function(name){
        if(this.mapping.has(name)) return this.products[this.mapping.get(name)]
    }

    insertProduct = function(name, description, price, quantity, category = null){
        if(this.mapping.has(name)) return `The Product with the name already exists. Please choose a unique product name.`
        let id = this.products.length
        let product = new Product(name, description, price, category)
        this.mapping.set(name, id)
        this.products.push(product)
        this.quantity.push(quantity)
    }

    searchProductByCategory = function(id){
        return this.products.filter((val) => val.categoryId == id)
    }
    
    productDescriptionByCategory = function(){
        let result = ``
        for(let key in CATEGORY ){
            result += `${key}:\n`
            let products = this.searchProductByCategory(CATEGORY[key])
            for(let product of products){
                let id = this.mapping.get(product.name)
                result += `${product.detail()} with product id ${id} and availability of ${this.quantity[id]}\n`
            }
        }
        return result
    }

}

module.exports = Inventory