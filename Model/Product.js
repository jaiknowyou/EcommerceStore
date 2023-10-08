class Product{
    constructor(name, description, price){
        this.name = name
        this.description = description
        this.price = price
        this.id = null
        this.categoryId = null
    }

    updateCategory = function(id){
        this.categoryId = id
    }

}

module.exports = Product