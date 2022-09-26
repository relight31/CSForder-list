import { Component } from '@angular/core';
import { Order } from './components/models';
import { orders } from './components/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'orders';

  addOrder(order: Order) {
    const uuid = order.uuid;
    orders.set(uuid, order);
    console.info('>>>> orders is ', orders);
  }
}
