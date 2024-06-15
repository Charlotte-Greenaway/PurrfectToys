import { getServerSession } from "next-auth";
import { groq } from "next-sanity";
import { client } from "~/../sanity/lib/client";
import { type userAccount } from "~/types/account";

export async function getUserAccountDetails() {
  const session = await getServerSession();
  if (!session) {
    return null;
  }
  const userEmail = session.user.email;
  const query = groq`*[_type == "userAccount" && user->email == $userEmail]{
        _id,
        tel,
        address,
        mailingPreferences,
        user->{
            name,
            email,
            image, _id
        },
        "createdAt": _createdAt,
    }[0]`;
  const data = await client.fetch(query, { userEmail });
  return data;
}

//get orders by user->email
export async function getUserOrders() {
  const session = await getServerSession();
  if (!session) {
    return null;
  }
  const userEmail = session.user.email;
  const query = groq`*[_type == "order" && userAccount->user->email == $userEmail]{
        orderTotal,
        orderDate,
        orderNumber,
    }`;
  const data = await client.fetch(query, { userEmail });
  return data;
}
export async function getUserOrderById(orderNumber: string) {
  const session = await getServerSession();
  if (!session) {
    return null;
  }
  const userEmail = session.user.email;
  const query = groq`*[_type == "order" && userAccount->user->email == $userEmail && orderNumber == $orderNumber]{
    orderTotal,
    orderDate,
    orderNumber,
    orderItems[]{
      item->{
        name,
        price,
        image,
        description,
        productId
      },
      count
    }
  }`;
  const data = await client.fetch(query, {
    userEmail,
    orderNumber,
  });
  return data;
}

export async function updateUserAccountDetails(userAccount: userAccount) {
  const session = await getServerSession();
  if (!session) {
    return null;
  }
  const userEmail = session.user.email;
  const query = groq`*[_type == "userAccount" && user->email == $userEmail]{
        _id
    }[0]`;
  const { _id } = await client.fetch(query, { userEmail });
  const patch = {
    tel: userAccount.tel,
    address: userAccount.address,
    mailingPreferences: userAccount.mailingPreferences,
  };
  await client.patch(_id).set(patch).commit();
  //update name on user document
  const userQuery = groq`*[_type == "user" && email == $userEmail]{
        _id
    }[0]`;
  const { _id: userId } = await client.fetch(userQuery, { userEmail });
  const userPatch = {
    name: userAccount.user.name,
  };
  await client.patch(userId).set(userPatch).commit();
  return true;
}
