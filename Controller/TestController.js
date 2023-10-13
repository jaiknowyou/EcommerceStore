const User = require("../Model/User")

TestController = {}

TestController.testCases = async function(req, res){
    let result = {
        t1:{},
        t2:{},
        t3:{},
        t4:{}
    }
    let user1 = new User('Nishant Palli')
    let user2 = new User('Jai Kumar')
    let user3 = new User('David Cooster')
    try{
        // TestCase 1: Multiple Users buying same Items concurrently.
        console.log(await CurrentInventory.productDescriptionByCategory())
        await user1.addToCart(1, 50)
        await user2.addToCart(1, 50)
        await user3.addToCart(1, 20)

        // Use Promise.all to await multiple asynchronous operations in parallel.
        const [user1CheckoutResult, user2CheckoutResult, user3CheckoutResult] = await Promise.all([
            user1.checkOut(),
            user2.checkOut(),
            user3.checkOut()
        ]);

        // Capture and return the results in the response.
        result['t1'][`${user1.name}`] = user1CheckoutResult
        result['t1'][`${user2.name}`] = user2CheckoutResult
        result['t1'][`${user3.name}`] = user3CheckoutResult
        console.log(await CurrentInventory.productDescriptionByCategory())
        user1.emptyCart()
        user2.emptyCart()
        user3.emptyCart()
    }catch(e){
        console.log("TestCase 1: Error")
    }
    try{
        // TestCase 2: Invalid Product Id is Passed.
        console.log(await CurrentInventory.productDescriptionByCategory())
        await user1.addToCart(3, 50)
        await user2.addToCart(6, 10)
        await user3.addToCart(5, 20)
        result['t2'][`${user1.name}`] = await user1.getCartDetails()
        result['t2'][`${user2.name}`] = await user2.getCartDetails()
        result['t2'][`${user3.name}`] = await user3.getCartDetails()
    }catch(e){
        console.log("TestCase 2: Error")
    }
    try{
        // TestCase 3: Removing Invalid Item From Cart wouldn't have any impact on Cart. 
        console.log(await CurrentInventory.productDescriptionByCategory())
        await user1.removeFromCart(1, 50)
        await user2.removeFromCart('ab', 10)
        await user3.removeFromCart(5, 20)
        result['t3'][`${user1.name}`] = await user1.getCartDetails()
        result['t3'][`${user2.name}`] = await user2.getCartDetails()
        result['t3'][`${user3.name}`] = await user3.getCartDetails()
        user1.emptyCart()
    }catch(e){
        console.log("TestCase 3: Error")
    }
    try{
        // TestCase 4: If quantity is more than present in Inventory, Item cannot be added to Cart.
        console.log(await CurrentInventory.productDescriptionByCategory())
        result['t4'][`${user1.name}`] = await user1.removeFromCart(1, 100)
        result['t4'][`${user2.name}`] = await user2.removeFromCart(2, 110)
        result['t4'][`${user3.name}`] = await user3.removeFromCart(3, 200)
    }catch(e){
        console.log("TestCase 4: Error")
    }
    return res.send(result)
}

module.exports = TestController