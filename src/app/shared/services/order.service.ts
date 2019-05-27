import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) {}

  getOrders() {
    return this.db.list('/orders').snapshotChanges();
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => {
      return ref.orderByChild('userID').equalTo(userId);
    }).snapshotChanges();
  }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
