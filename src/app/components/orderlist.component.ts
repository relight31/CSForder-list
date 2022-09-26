import { Component, OnInit } from '@angular/core';
import { orders } from './models';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
})
export class OrderlistComponent implements OnInit {
  get orderlist() {
    let keys = Array.from(orders.keys());
    console.info(keys);
    for (const key of keys) {
      console.info('key: ', key);
      const name = orders.get(key).name;
      console.info('name: ', name);
      this._orderlist.push([key, name]);
    }
    console.info('>>>> orderlist length ', this._orderlist.length);
    return this._orderlist;
  }
  _orderlist: any[] = [];
  constructor() {}

  ngOnInit(): void {}

  displaySelectedOrder() {}
}
