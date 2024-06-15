import { getServerSession } from "next-auth";
import {
  getUserAccountDetails,
} from "~/lib/user-accounts/utils";
import { type userAccount } from "~/types/account";
import { groq } from "next-sanity";
import { client } from "~/../sanity/lib/client";
import { LocalBasketItem } from "~/types/basket";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return new Response(null, { status: 401 });
  }

  const userAccount: userAccount = await getUserAccountDetails();
  //set basket items as an array of LocalBasketItem
  const { basketItems }: { basketItems: LocalBasketItem[] } = await req.json();
  //calculate order total
  const subTotal = basketItems.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const shipping = subTotal > 50 ? 0 : 5.99;
  const orderTotal = subTotal + shipping;
  //get _id from shopItems using productId
  const query = groq`*[_type == "shopItems" && productId in $productIds]{
    productId,
    _id
  }`;
  const productIds: {
    productId: string;
    _id: string;
  }[] = await client.fetch(query, {
    productIds: basketItems.map((item) => item.productId),
  });
  //create orderItems array
  const orderItems = productIds.map((product) => {
    const count = basketItems.find(
      (basketItem) => basketItem.productId === product.productId
    )?.count;
    return {
      _key: crypto.randomUUID(),
      item: {
        _type: "reference",
        _ref: product._id,
      },
      count: count,
    };
  });
  //create order object related to user using email
  const order = {
    orderNumber: crypto.randomUUID(),
    _type: "order",
    orderDate: new Date().toISOString(),
    orderTotal,
    orderItems,
    userAccount: {
      _type: "reference",
      _ref: userAccount._id,
    },
  };
  //decrease stock in shopItems
  const updatePromises = productIds.map((product) => {
    const count = basketItems.find(
      (basketItem) => basketItem.productId === product.productId
    )?.count;
    if (!count) return;
    return client.patch(product._id).dec({ stock: count }).commit();
  });
  await Promise.all(updatePromises);
  //create order in sanity
  try {
    await client.create(order);
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
