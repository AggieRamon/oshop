import { Component } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  order$: Observable<any>;

  constructor(private orderService: OrderService) {
    this.order$ = this.orderService.getOrders();
  }

}
