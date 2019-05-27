import { DatabaseSnapshot, AngularFireAction, Action } from '@angular/fire/database';

export interface Product {
    key: string;
    title: string;
    category: string;
    price: number;
    imageUrl: string;
    quantity: number;
    payload: {
        val(): Product;
    };
}
