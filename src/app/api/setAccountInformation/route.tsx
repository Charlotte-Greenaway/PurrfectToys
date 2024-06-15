import { getServerSession } from "next-auth";
import { updateUserAccountDetails } from "~/lib/user-accounts/utils";
import { type userAccount } from "~/types/account";
export async function POST(req: Request) {
  const { name, address, phone, mailingPreferences } = await req.json();

  const session = await getServerSession();
  if (!session?.user?.email) {
    return new Response(null, { status: 401 });
  }
  const userAccount: userAccount = {
    tel: phone,
    address,
    mailingPreferences,
    user: {
      name,
      email: session.user.email,
    },
  };
  try {
    await updateUserAccountDetails(userAccount);
    return new Response(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
