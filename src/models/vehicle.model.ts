import mongoose, { Document, Schema } from "mongoose";

export type VehicleType = "bike" | "auto" | "car";

export type VehicleCategory = "bike" | "auto" | "mini" | "sedan" | "suv";

export type VehicleStatus = "approved" | "pending" | "rejected";

export interface IVehicle extends Document {
  partnerId: mongoose.Types.ObjectId;

  type: VehicleType;

  category: VehicleCategory;

  vehicleMode: string;

  registrationNumber: string;

  imageUrl?: string;

  baseFare?: number;

  pricePerKM: number;

  waitingCharge: number;

  status: VehicleStatus;

  brand: string;

  color: string;

  rejectionReason?: string;

  createdAt: Date;

  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["bike", "auto", "car"],
      required: true,
    },

    category: {
      type: String,
      enum: ["bike", "auto", "mini", "sedan", "suv"],
      required: true,
    },

    vehicleMode: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },

    imageUrl: {
      type: String,
      trim: true,
    },

    baseFare: {
      type: Number,
      min: 0,
    },

    pricePerKM: {
      type: Number,
      required: true,
      min: 0,
    },

    waitingCharge: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
      index: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    rejectionReason: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Vehicle =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;
