import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  order$: Observable<any>;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.order$ = this.authService.user$.pipe(switchMap(u => {
      return this.orderService.getOrdersByUser(u.uid);
    }));
  }

}
