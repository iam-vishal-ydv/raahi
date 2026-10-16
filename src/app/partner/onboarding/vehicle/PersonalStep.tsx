import Input from "@/components/Form/Input";
import type { OnboardingFormData, HandleOnChange } from "@/types/onboarding";

interface Props {
  formData: OnboardingFormData;
  handleOnChange: HandleOnChange;
}

export default function PersonalStep({ formData, handleOnChange }: Props) {
  return (
    <div>
      <h3 className="text-xl font-black">Tell us about yourself</h3>
      <p className="mb-7 mt-1 text-sm text-black/50">
        Enter your basic details to create your partner profile.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(value) => handleOnChange("fullName", value)}
        />

        <Input
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={(value) => handleOnChange("phone", value)}
        />

        <Input
          name="dob"
          label="Date of Birth"
          type="date"
          value={formData.dob}
          onChange={(value) => handleOnChange("dob", value)}
        />

        <Input
          name="city"
          label="City"
          placeholder="Enter your city"
          value={formData.city}
          onChange={(value) => handleOnChange("city", value)}
        />

        <div className="sm:col-span-2">
          <Input
            name="address"
            label="Address"
            placeholder="Enter your current address"
            value={formData.address}
            onChange={(value) => handleOnChange("address", value)}
          />
        </div>
      </div>
    </div>
  );
}
