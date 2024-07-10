import getId from "../utils/getId";

class CartItem {
    constructor(name, price) {
        this.name = name,
            this.price = price,
            this.id = getId()
    }
}

export default CartItem;