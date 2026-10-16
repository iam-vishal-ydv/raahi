import { ShieldCheck } from "lucide-react";
import Input from "@/components/Form/Input";
import type { OnboardingFormData, HandleOnChange } from "@/types/onboarding";

interface Props {
  formData: OnboardingFormData;
  handleOnChange: HandleOnChange;
}

export default function BankStep({ formData, handleOnChange }: Props) {
  return (
    <div>
      <h3 className="text-xl font-black">Add your bank account</h3>
      <p className="mb-7 mt-1 text-sm text-black/50">
        Your bank account will be used for partner payouts.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="accountHolderName"
          label="Account Holder Name"
          placeholder="Name as per bank account"
          value={formData.accountHolderName}
          onChange={(v) => handleOnChange("accountHolderName", v)}
        />

        <Input
          name="bankName"
          label="Bank Name"
          placeholder="Enter bank name"
          value={formData.bankName}
          onChange={(v) => handleOnChange("bankName", v)}
        />

        <Input
          name="accountNumber"
          label="Account Number"
          type="password"
          placeholder="Enter account number"
          value={formData.accountNumber}
          onChange={(v) => handleOnChange("accountNumber", v)}
        />

        <Input
          name="ifscCode"
          label="IFSC Code"
          placeholder="SBIN0001234"
          value={formData.ifscCode}
          onChange={(v) => handleOnChange("ifscCode", v)}
        />

        <div className="sm:col-span-2">
          <Input
            name="branchName"
            label="Branch Name"
            placeholder="Enter branch name"
            value={formData.branchName}
            onChange={(v) => handleOnChange("branchName", v)}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl bg-[#F4F4F1] p-4">
        <ShieldCheck size={20} className="mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-bold">Your bank details are protected</p>
          <p className="mt-1 text-xs leading-5 text-black/50">
            These details are used for bank verification and partner payouts.
          </p>
        </div>
      </div>
    </div>
  );
}
