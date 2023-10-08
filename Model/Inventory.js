const Product = require("./Product")

class Inventory{
    constructor(location){
        this.products = []
        this.mapping = new Map()
        // Use Array for small and fixed product set amd to filter Products easily
        // Use Map for large data keeping quantity and product details
        // RDBMS for searching and filtering
        this.quantity = []
        this.lock = [] // locking specific product while change in inventory of that product
        this.location = location
    }

    updateProductInventory = function(id, quantity){
        new Promise((resolve, reject)=>{
            try{
                if(quantity < 0 && -quantity > this.quantity[id]) return reject(`Only ${this.quantity[id]} of product ${this.products[id].name} is available.`)
                this.quantity += quantity
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

    insertProduct = function(name, description, price){
        if(this.mapping.has(name)) return `The Product with the name already exists. Please choose a unique product name.`
        let id = this.products.length
        let product = Product(id, name, description, price)
        this.mapping.set(name, id)
        this.products.push(product)
    }

    searchProductByCategory = function(){

    }

}