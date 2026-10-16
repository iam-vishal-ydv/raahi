export interface OnboardingFormData {
  fullName: string;
  phone: string;
  dob: string;
  city: string;
  address: string;

  aadhaar: File | null;
  pan: File | null;
  drivingLicense: File | null;
  selfie: File | null;
  videoKyc: File | null;

  vehicleNumber: string;
  vehicleType: string;
  category: string;
  brand: string;
  model: string;
  color: string;
  manufacturingYear: string;
  fuelType: string;
  vehicleImage: File | null;

  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
}

export type HandleOnChange = (
  name: keyof OnboardingFormData,
  value: string | File | null,
) => void;
