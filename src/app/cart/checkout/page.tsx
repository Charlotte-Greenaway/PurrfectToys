import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FinalCheckout from "./_components/final-checkout";
import { getUserAccountDetails } from "~/lib/user-accounts/utils";
import type { userAccount } from "~/types/account";

export default async function CheckoutPage() {
  const userAccount: userAccount = await getUserAccountDetails();
  const hasAddressAndTel =
    userAccount?.address !== "" && userAccount?.tel !== "" ? true : false;
  const session = await getServerSession();
  //if not logged in redirect to signin page
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <main>
      <FinalCheckout hasAddressAndTel={hasAddressAndTel} />
    </main>
  );
}
