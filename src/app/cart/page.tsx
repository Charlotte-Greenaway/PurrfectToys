import Cart from "./_components/cart-section";
import FeaturedProducts from "~/app/_components/partials/featured-products";
import { getUserAccountDetails } from "~/lib/user-accounts/utils";
import type { userAccount } from "~/types/account";

export  default async function CartPage() {
  const userAccount:userAccount = await getUserAccountDetails();
  const hasAddressAndTel = (userAccount?.address!=="" && userAccount?.tel!=="")?true:false;
  return (
    <main>
      <Cart hasAddressAndTel={hasAddressAndTel}/>
      <FeaturedProducts />
    </main>
  );
}
