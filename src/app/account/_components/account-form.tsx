"use client";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { PawPrintIcon } from "lucide-react";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import resolver from "./resolver";
type FormValues = {
  name: string | null;
  address: string | null;
  phone: string | null;
  mailingPreferences: string | null;
};

export default function AccountForm(defaults: {
  name: string;
  address: string;
  phone: string;
  email: string;
  mailingPreferences: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { name, address, phone, email, mailingPreferences } = defaults;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit(async (data) => {
    toast({
      title: "Updating Account",
      description: "Please wait while we update your account information.",
    });
    const res = await fetch("/api/setAccountInformation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      toast({
        title: "Error",
        description:
          "An error occurred while updating your account information.",
        variant: "destructive",
      });
      return;
    } else {
      toast({
        title: "Account Updated",
        description: "Your account information has been updated.",
      });
      router.refresh();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={name} {...register("name")} />
            {errors?.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              defaultValue={address}
              {...register("address")}
            />
            {errors?.address && <p>{errors.address.message}</p>}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue={phone} {...register("phone")} />
            {errors?.phone && <p>{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={email} disabled />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Label htmlFor="mailingPreferences" className="pt-4">
          Consent to marketing and promotional emails
        </Label>
        <select
          id="mailingPreferences"
          defaultValue={mailingPreferences ?? "no"}
          {...register("mailingPreferences")}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="yes">Yes, I would like to receive emails</option>
          <option value="no">No, I would not like to receive emails</option>
        </select>

        {errors?.mailingPreferences && (
          <p>{errors.mailingPreferences.message}</p>
        )}
      </div>
      <Button
        variant="outline"
        className="bg-[#F1279A] text-white hover:bg-[#F1279A]/90 w-full mt-4"
        type="submit"
      >
        <PawPrintIcon className="h-5 w-5 mr-2" />
        Save Changes
      </Button>
    </form>
  );
}
