import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import UploadCard from "@/components/Form/FileUpload";
import type { OnboardingFormData, HandleOnChange } from "@/types/onboarding";

interface Props {
  formData: OnboardingFormData;
  handleOnChange: HandleOnChange;
}

export default function VehicleStep({ formData, handleOnChange }: Props) {
  return (
    <div>
      <h3 className="text-xl font-black">Add your vehicle</h3>
      <p className="mb-7 mt-1 text-sm text-black/50">
        Tell us about the vehicle you will use for Raahi rides.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          name="vehicleNumber"
          label="Vehicle Number"
          placeholder="UP14AB1234"
          value={formData.vehicleNumber}
          onChange={(v) => handleOnChange("vehicleNumber", v)}
        />

        <Select
          name="vehicleType"
          label="Vehicle Type"
          options={["Bike", "Auto", "Car"]}
          value={formData.vehicleType}
          onChange={(v) => handleOnChange("vehicleType", v)}
        />

        <Select
          name="category"
          label="Vehicle Category"
          options={["Bike", "Auto", "Mini", "Sedan", "SUV"]}
          value={formData.category}
          onChange={(v) => handleOnChange("category", v)}
        />

        <Input
          name="brand"
          label="Brand"
          placeholder="Honda, Tata, Hyundai..."
          value={formData.brand}
          onChange={(v) => handleOnChange("brand", v)}
        />

        <Input
          name="model"
          label="Model"
          placeholder="Vehicle model"
          value={formData.model}
          onChange={(v) => handleOnChange("model", v)}
        />

        <Input
          name="color"
          label="Color"
          placeholder="Vehicle color"
          value={formData.color}
          onChange={(v) => handleOnChange("color", v)}
        />

        <Input
          name="manufacturingYear"
          label="Manufacturing Year"
          type="number"
          placeholder="2024"
          value={formData.manufacturingYear}
          onChange={(v) => handleOnChange("manufacturingYear", v)}
        />

        <Select
          name="fuelType"
          label="Fuel Type"
          options={["Petrol", "Diesel", "CNG", "Electric"]}
          value={formData.fuelType}
          onChange={(v) => handleOnChange("fuelType", v)}
        />

        <UploadCard
          title="Vehicle Image"
          description="Upload a clear vehicle image"
          accept="image/*"
          className="sm:col-span-2"
          onFileSelect={(file) => handleOnChange("vehicleImage", file)}
        />
      </div>
    </div>
  );
}
