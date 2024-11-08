"use server";

import { cookies } from "next/headers";
import { invalidateUserSessions } from "@/lib/auth/session";
import { updateUser, updateUserPassword } from "@/data-access/user";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaTypes,
} from "@/lib/validations/auth";
import {
  deletePasswordResetTokenCookie,
  invalidatePasswordResetToken,
  validatePasswordResetRequest,
} from "@/lib/auth/password-reset";
import { rateLimitByIp, unauthenticatedRateLimit } from "@/utils/rate-limiter";

export async function resetPasswordAction(data: ResetPasswordSchemaTypes) {
  try {
    if (
      !(await unauthenticatedRateLimit()) ||
      !(await rateLimitByIp({
        key: "reset-password",
        limit: 2,
        interval: 30000,
      }))
    ) {
      return { error: "Too many requests. Please try again later." };
    }

    const token = (await cookies()).get("pw-reset")?.value || "";

    const pwResetToken = await validatePasswordResetRequest(token);

    if (pwResetToken) await invalidatePasswordResetToken(pwResetToken.userId);

    if (!pwResetToken) {
      return { error: "Invalid or expired token" };
    }

    const { password, logOutOtherDevices } = ResetPasswordSchema.parse(data);

    if (logOutOtherDevices) {
      await invalidateUserSessions(pwResetToken.userId);
    }

    await updateUserPassword(pwResetToken.userId, password);

    await updateUser(pwResetToken.userId, { emailVerified: true });

    await deletePasswordResetTokenCookie();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
