class Product{
    constructor(name, description, price, category){
        this.name = name
        this.description = description
        this.price = price
        // We can use Strategy Pattern for Dynamic Pricing
        this.id = null
        this.categoryId = category
    }

    detail = ()=>{
        return `The Product ${this.name} having cost ${this.price}`
    }

}

module.exports = Product