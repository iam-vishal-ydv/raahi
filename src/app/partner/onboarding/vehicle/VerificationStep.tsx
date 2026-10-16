import UploadCard from "@/components/Form/FileUpload";
import type { OnboardingFormData, HandleOnChange } from "@/types/onboarding";

interface Props {
  formData: OnboardingFormData;
  handleOnChange: HandleOnChange;
}

export default function VerificationStep({ formData, handleOnChange }: Props) {
  return (
    <div>
      <h3 className="text-xl font-black">Verify your identity</h3>
      <p className="mb-7 mt-1 text-sm text-black/50">
        Upload the documents required for partner verification.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <UploadCard
          title="Aadhaar Card"
          description="Upload your Aadhaar document"
          accept="image/*,.pdf"
          onFileSelect={(file) => handleOnChange("aadhaar", file)}
        />

        <UploadCard
          title="PAN Card"
          description="Upload your PAN card"
          accept="image/*,.pdf"
          onFileSelect={(file) => handleOnChange("pan", file)}
        />

        <UploadCard
          title="Driving License"
          description="Upload your valid driving license"
          accept="image/*,.pdf"
          onFileSelect={(file) => handleOnChange("drivingLicense", file)}
        />

        <UploadCard
          title="Selfie"
          description="Upload a clear selfie"
          accept="image/*"
          onFileSelect={(file) => handleOnChange("selfie", file)}
        />

        <UploadCard
          title="Video KYC"
          description="Upload your video verification"
          accept="video/*"
          maxSizeMB={50}
          className="sm:col-span-2"
          onFileSelect={(file) => handleOnChange("videoKyc", file)}
        />
      </div>
    </div>
  );
}
