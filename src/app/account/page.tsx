import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import AccountForm from './_components/account-form'
import OrderDrawer from "./_components/order-drawer";
import {getUserAccountDetails} from "~/lib/user-accounts/utils";
import { type userAccount } from "~/types/account";
import {getUserOrders} from "~/lib/user-accounts/utils";
import  { type order } from "~/types/account";
import {format} from 'date-fns';

export default async function AccountPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/signin");
    return null;
  }
  const userAccount:userAccount = await getUserAccountDetails();
  const { tel, address, user, mailingPreferences } = userAccount;
  const orders: order[] = await getUserOrders();
  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#F1279A]">My Account</h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <AccountForm
          name={user.name??""}
          address={address??""}
          phone={tel??""}
          email={user.email}
          mailingPreferences={mailingPreferences??"no"}
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mt-6" id="orders">
        <div className="flex items-start  mb-6 gap-4">
          <h2 className="text-2xl font-bold text-[#F1279A]">My Orders</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            orders && orders.map((order)=>(
              <div className="bg-gray-100 rounded-lg p-4 flex flex-col justify-between" key={order.orderNumber}>
                <div>
                  <h3 className="text-lg font-bold">Order #{order.orderNumber}</h3>
                  <p className="text-gray-500">Placed on {format(new Date(order.orderDate),  "yyyy-MM-dd")}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-[#F1279A] font-bold">£{order.orderTotal.toFixed(2)}</p>
                  <OrderDrawer orderNumber={order.orderNumber}/>
                </div>
              </div>
            ))
          }
          {
            orders.length==0 && <p>No orders found</p>
          }
        </div>
      </div>
    </div>
  );
}
