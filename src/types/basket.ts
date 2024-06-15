export interface BasketItem {
    name: string;
    price: number;
    image: string;
    description: string;
    sections: string[];
    productId: string;
    stock: number;
  }

  export interface LocalBasketItem {
    name: string;
    price: number;
    image: string;
    description: string;
    sections: string[];
    productId: string;
    count: number;  
    stock: number;
  }