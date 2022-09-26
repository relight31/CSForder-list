import { Component, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Order, LineItem } from './models';

@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.css'],
})
export class OrderformComponent implements OnInit {
  form!: FormGroup;
  items!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm({});
  }

  createForm(order: Partial<Order>) {
    // Partial allows you to skip fields in Order class
    if (order) {
      this.items = this.createLineItems(order.items);
    } else {
      this.items = this.createLineItems();
    }
    this.form = this.fb.group({
      name: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      mobile: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      items: this.items,
    });
    this.addItem();
  }

  createLineItems(items: LineItem[] = []) {
    // the LineItem[]=[] notation means default value is []
    return this.fb.array(
      items.map((i) => this.createLineItem(i)),
      [Validators.minLength(1)]
    );
  }

  createLineItem(li: LineItem) {
    if (!li) {
      return this.fb.group({
        item: this.fb.control<string>('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        quantity: this.fb.control<number>(0, [
          Validators.required,
          Validators.min(1),
        ]),
      });
    } else {
      return this.fb.group({
        item: this.fb.control<string>('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        quantity: this.fb.control<number>(0, [
          Validators.required,
          Validators.min(1),
        ]),
      });
    }
  }

  addItem() {
    const item = this.fb.group({
      item: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      quantity: this.fb.control<number>(0, [
        Validators.required,
        Validators.min(1),
      ]),
    });
    this.items.push(item);
  }

  @Output()
  onSubmitOrder = new Subject<Order>();

  processForm() {
    console.info(this.form.value);
    const order: Order = this.form.value as Order;
    order.uuid = uuid().slice(0, 8);
    console.info(order);
    this.onSubmitOrder.next(order);
    this.createForm({});
  }

  deleteItem(i: number) {
    this.items.removeAt(i);
  }
}
