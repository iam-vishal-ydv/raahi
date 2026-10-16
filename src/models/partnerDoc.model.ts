import mongoose, { Document, Schema } from "mongoose";

export type PartnerDocumentType =
  | "aadhaar"
  | "pan"
  | "drivingLicense"
  | "selfie"
  | "videoKyc";

export type DocumentStatus = "pending" | "verified" | "rejected";

export interface IPartnerDocument extends Document {
  partnerId: mongoose.Types.ObjectId;

  type: PartnerDocumentType;

  documentUrl: string;

  status: DocumentStatus;

  rejectionReason?: string;

  verifiedAt?: Date;

  createdAt: Date;

  updatedAt: Date;
}

const partnerDocumentSchema = new Schema<IPartnerDocument>(
  {
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["aadhaar", "pan", "drivingLicense", "selfie", "videoKyc"],
      required: true,
    },

    documentUrl: {
      type: String,
      required: true,
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

partnerDocumentSchema.index({ partnerId: 1, type: 1 }, { unique: true });

const PartnerDocument =
  mongoose.models.PartnerDocument ||
  mongoose.model<IPartnerDocument>("PartnerDocument", partnerDocumentSchema);

export default PartnerDocument;
