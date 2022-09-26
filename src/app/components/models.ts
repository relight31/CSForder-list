export interface Order {
  name: string;
  mobile: string;
  uuid?: string;
  items: LineItem[];
}

export interface LineItem {
  itemname: string;
  quantity: number;
}

// export const orders:any = {}
export const orders = new Map();

export type OrderDB = {
  [key: string]: Order;
};
export const orderDB: OrderDB = {};
