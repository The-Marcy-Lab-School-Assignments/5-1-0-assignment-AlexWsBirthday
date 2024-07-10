import getId from "../utils/getId";
import CartItem from "./CartItem";

class ShoppingCart {
    //all carts belong to the class, and is a private property
    static #allCarts = [];

    #cartItems = []
    //only property that is constructed with each instance is the id, so each cart is unique
    constructor() {
        //creating an id for the instance to make sure it is distinguished from any other instances of shoppingcart
        this.id = getId();
        //accessing the private static property all carts and pushing the instance of the class to this list immediately
        ShoppingCart.#allCarts.push(this)
    }

    //creating a new item
    createItem(name, price) {
        //calling the new cart item method (imported from cartitem file) and storing it in a variable
        const newItem = new CartItem(name, price)
        //targeting the current instance's private cartitems (an array) and pushing the variable containing the new cartitem
        this.#cartItems.push(newItem)

        //returning the variable w cartitem
        return newItem
    }

    getItems() {
        return [...this.#cartItems]
    }

    getTotal() {
        let total = 0;
        this.#cartItems.forEach((item) => total += item.price)
        return total
    }

    removeItem(itemID) {
        //find the item by id in the array and store it in a variable
        //deleteMe returns **index** 
        const deleteMe = this.#cartItems.find((item) => item.id === itemID);
        //splice using the variable you jsut created

        //taking the index number that was returned by deleteme and searching through the array for 
        //the item at the index to DELETE IT
        this.#cartItems.splice(this.#cartItems.indexOf(deleteMe), 1)
    }


    //since findBy works with data from the class and not the instances (besides their ids, which have been made into data via pushing them into a static/class property)
    //this method must also be static/ must also be a class method to access class data 
    static findBy(id) {
        return ShoppingCart.#allCarts.find((cart) => cart.id === id || null);
    }



    //static means it belongs to the class, not the instances of the class. therefore it works with other static properties and methods of the class
    static listAll() {
        return [...this.#allCarts]
    }
}


export default ShoppingCart;