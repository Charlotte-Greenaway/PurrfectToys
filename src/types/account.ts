export interface userAccount {
  _id?: string;
  tel?: string;
  address?: string;
  mailingPreferences?: string;
  user: {
    name?: string;
    email: string;
    image?: string;
  };
  createdAt?: string;
}

export interface order {
  orderNumber: string;
  orderDate: string;
  orderTotal: number;
  orderItems?: {
    item: {
      _id: string;
      name: string;
      price: number;
      image: string;
      sections: {
        _id: string;
        title: string;
      }[];
      stock: string;
      description: string;  
      productId: string;
    };
    count: number;
  }[];
  userAccount?: userAccount
}
