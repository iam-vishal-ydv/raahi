import { randomInt } from "node:crypto";
import "server-only";

export function generateOTP(length: number = 6): string {
  if (!Number.isInteger(length) || length < 1 || length > 15) {
    throw new Error("OTP length must be an integer between 1 and 15");
  }

  const min = 10 ** (length - 1);
  const max = 10 ** length;

  return randomInt(min, max).toString();
}
