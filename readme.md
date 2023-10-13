
Structure
    User = Id, SignUp, Auth Login, Cart and Notification, WishList, Wallet
    User Cart - update Cart Products, Previous Orders, Checkout = cart Empty, Generate Discount Coupon, Invoice, Update Inventory.
    Inventory of Products = Inventory Update, Location, Quantity, Global Access
    Product = Id, Name, Details, price
    Invoice Objects

Config:
    N orders Discount


Steps:
1. Make Rough Code(Model) Architecture
2. Write TestCases and reform Architecture
3. Complete APIs
4. TestCases and Debugging
5. Commenting and Documentation


TestCases:
<!--  -->
1. Multiple Users buying same Items concurrently.
2. Invalid Product Id is Passed.
3. Removing Invalid Item From Cart wouldn't have any impact on Cart.
4. If quantity is more than present in Inventory, Item cannot be added to Cart.