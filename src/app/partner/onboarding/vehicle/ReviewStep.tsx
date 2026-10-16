import { Check } from "lucide-react";
import type { OnboardingFormData } from "@/types/onboarding";

interface Props {
  formData: OnboardingFormData;
}

export default function ReviewStep({ formData }: Props) {
  const sections = [
    {
      title: "Personal Details",
      items: [
        ["Name", formData.fullName],
        ["Phone", formData.phone],
        ["City", formData.city],
      ],
    },
    {
      title: "Verification",
      items: [
        ["Aadhaar", formData.aadhaar?.name],
        ["PAN", formData.pan?.name],
        ["Driving License", formData.drivingLicense?.name],
        ["Selfie", formData.selfie?.name],
        ["Video KYC", formData.videoKyc?.name],
      ],
    },
    {
      title: "Vehicle",
      items: [
        ["Vehicle Number", formData.vehicleNumber],
        ["Type", formData.vehicleType],
        ["Category", formData.category],
        ["Brand", formData.brand],
        ["Model", formData.model],
      ],
    },
    {
      title: "Bank",
      items: [
        ["Account Holder", formData.accountHolderName],
        ["Bank", formData.bankName],
        ["IFSC", formData.ifscCode],
        ["Branch", formData.branchName],
      ],
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-black">Review your application</h3>
      <p className="mb-7 mt-1 text-sm text-black/50">
        Check your details before submitting.
      </p>

      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-black/10 p-4"
          >
            <h4 className="mb-3 text-sm font-black">{section.title}</h4>

            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-black/40">{label}</p>
                  <p className="mt-0.5 break-words text-sm font-semibold">
                    {value || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3 rounded-2xl border border-[#C8FF00] bg-[#C8FF00]/15 p-4">
        <Check size={20} className="shrink-0" />
        <div>
          <p className="text-sm font-bold">Ready for review</p>
          <p className="mt-1 text-xs text-black/60">
            Your application will be reviewed by the Raahi team after
            submission.
          </p>
        </div>
      </div>
    </div>
  );
}
