import mongoose, { Document, Schema } from "mongoose";

export type BankAccountStatus = "pending" | "verified" | "rejected";

export interface IPartnerBank extends Document {
  partnerId: mongoose.Types.ObjectId;

  accountHolderName: string;

  accountNumber: string;

  ifscCode: string;

  bankName: string;

  branchName?: string;

  status: BankAccountStatus;

  rejectionReason?: string;

  verifiedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}

const partnerBankSchema = new Schema<IPartnerBank>(
  {
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    bankName: {
      type: String,
      required: true,
      trim: true,
    },

    branchName: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },

    rejectionReason: {
      type: String,
      trim: true,
    },

    verifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const PartnerBank =
  mongoose.models.PartnerBank ||
  mongoose.model<IPartnerBank>("PartnerBank", partnerBankSchema);

export default PartnerBank;
