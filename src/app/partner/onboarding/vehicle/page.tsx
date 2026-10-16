"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bike,
  Check,
  FileCheck2,
  Landmark,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import UploadCard from "@/components/Form/FileUpload";
import PersonalStep from "./PersonalStep";
import VehicleStep from "./VehicleStep";
import BankStep from "./BankStep";
import ReviewStep from "./ReviewStep";
import { OnboardingFormData } from "@/types/onboarding";
import VerificationStep from "./VerificationStep";

const steps = [
  {
    id: 1,
    title: "Personal",
    description: "Basic details",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Verification",
    description: "KYC & identity",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Vehicle",
    description: "Vehicle details",
    icon: Bike,
  },
  {
    id: 4,
    title: "Bank",
    description: "Payout account",
    icon: Landmark,
  },
  {
    id: 5,
    title: "Review",
    description: "Submit application",
    icon: FileCheck2,
  },
];

export default function PartnerOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const current = steps.find((step) => step.id === currentStep);
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: "",
    phone: "",
    dob: "",
    city: "",
    address: "",
    aadhaar: null as File | null,
    pan: null as File | null,
    drivingLicense: null as File | null,
    selfie: null as File | null,
    videoKyc: null as File | null,
    vehicleNumber: "",
    vehicleType: "",
    category: "",
    brand: "",
    model: "",
    color: "",
    manufacturingYear: "",
    fuelType: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    vehicleImage: null,
  });

  const handleOnChange = (name: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  console.log(formData, "fromdata");

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F4F1] text-black">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
                <span className="text-lg font-black text-[#C8FF00]">R</span>
              </div>

              <span className="text-xl font-black tracking-tight">Raahi</span>
            </div>

            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Become a Raahi Partner
            </h1>

            <p className="mt-1 text-sm text-black/55">
              Complete your profile and start earning with Raahi.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold sm:flex">
            <ShieldCheck size={16} />
            Secure onboarding
          </div>
        </div>

        <div className="grid flex-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="mb-5 rounded-2xl bg-black p-5 text-white">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C8FF00] text-black">
                <BadgeCheck size={22} />
              </div>

              <h2 className="text-lg font-bold">Partner verification</h2>

              <p className="mt-1 text-xs leading-5 text-white/60">
                A few quick steps before you can start accepting rides.
              </p>
            </div>

            <div className="space-y-2">
              {steps.map((step) => {
                const Icon = step.icon;
                const completed = currentStep > step.id;
                const active = currentStep === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => {
                      if (completed) {
                        setCurrentStep(step.id);
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left transition ${
                      active
                        ? "bg-black text-white"
                        : completed
                          ? "bg-[#C8FF00]/20 text-black"
                          : "text-black/45"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-[#C8FF00] text-black"
                          : completed
                            ? "bg-[#C8FF00] text-black"
                            : "bg-black/5"
                      }`}
                    >
                      {completed ? (
                        <Check size={18} strokeWidth={3} />
                      ) : (
                        <Icon size={18} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold">{step.title}</p>

                      <p
                        className={`text-xs ${
                          active ? "text-white/55" : "text-black/40"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-[#F4F4F1] p-4">
              <p className="text-xs font-bold">Your information is safe</p>

              <p className="mt-1 text-xs leading-5 text-black/50">
                Your documents are used only for partner verification.
              </p>
            </div>
          </aside>

          <section className="flex min-h-[600px] flex-col rounded-3xl border border-black/10 bg-white shadow-sm">
            <div className="border-b border-black/10 px-5 py-5 sm:px-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                    Step {currentStep} of {steps.length}
                  </p>

                  <h2 className="mt-1 text-2xl font-black">{current?.title}</h2>

                  <p className="mt-1 text-sm text-black/50">
                    {current?.description}
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-black/40">
                    Progress
                  </p>

                  <p className="mt-1 text-lg font-black">
                    {Math.round((currentStep / steps.length) * 100)}%
                  </p>
                </div>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-black/5">
                <div
                  className="h-full rounded-full bg-[#C8FF00] transition-all duration-300"
                  style={{
                    width: `${(currentStep / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex-1 p-5 sm:p-8">
              {currentStep === 1 && (
                <PersonalStep
                  formData={formData}
                  handleOnChange={handleOnChange}
                />
              )}

              {currentStep === 2 && (
                <VerificationStep
                  formData={formData}
                  handleOnChange={handleOnChange}
                />
              )}

              {currentStep === 3 && (
                <VehicleStep
                  formData={formData}
                  handleOnChange={handleOnChange}
                />
              )}

              {currentStep === 4 && (
                <BankStep formData={formData} handleOnChange={handleOnChange} />
              )}

              {currentStep === 5 && <ReviewStep formData={formData} />}
            </div>

            <div className="flex items-center justify-between border-t border-black/10 px-5 py-4 sm:px-8">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-black/5 disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft size={17} />
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-black/85"
                >
                  Continue
                  <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C8FF00] px-5 py-3 text-sm font-black text-black transition hover:brightness-95"
                >
                  Submit Application
                  <Check size={17} strokeWidth={3} />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7">
      <h3 className="text-xl font-black">{title}</h3>

      <p className="mt-1 text-sm text-black/50">{description}</p>
    </div>
  );
}
