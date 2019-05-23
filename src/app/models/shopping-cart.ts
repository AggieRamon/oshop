import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = this.itemsMap || {};
        // tslint:disable-next-line: forin
        for (let productId in itemsMap) {
            const item = itemsMap[productId];
            // Object.assign(x, item);
            // x.key = productId;
            this.items.push(new ShoppingCartItem({ ...item, key: productId }));
        }
    }

    getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line: forin
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line: forin
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}
