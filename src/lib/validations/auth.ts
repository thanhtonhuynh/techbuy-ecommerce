import { z } from "zod";

const trimmedString = z.string().trim();
const requiredString = trimmedString.min(1, "Required");
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

// Sign up
export const SignupSchema = z.object({
  name: trimmedString
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must not exceed 20 characters")
    .transform((data) => {
      return data
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }),
  username: trimmedString
    .min(6, "Username must be at least 6 characters")
    .max(50, "Username must not exceed 50 characters")
    .toLowerCase(),
  email: requiredString.email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^`+~.-])[A-Za-z\d@$!%*?&#^`+~.-]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});
export type SignupSchemaTypes = z.infer<typeof SignupSchema>;

// Login
export const LoginSchema = z.object({
  identifier: requiredString.toLowerCase(),
  password: z.string(),
});
export type LoginSchemaTypes = z.infer<typeof LoginSchema>;

// Update name, make first letter of every word uppercase
export const UpdateNameSchema = z.object({
  name: trimmedString
    .min(2, "Name must be at least 2 characters")
    .max(20, "Name must not exceed 20 characters")
    .transform((data) => {
      return data
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }),
});
export type UpdateNameSchemaInput = z.infer<typeof UpdateNameSchema>;

// Update username
export const UpdateUsernameSchema = z.object({
  username: trimmedString
    .min(6, "Username must be at least 6 characters")
    .max(50, "Username must not exceed 50 characters")
    .toLowerCase(),
});
export type UpdateUsernameSchemaInput = z.infer<typeof UpdateUsernameSchema>;

// Update email
export const UpdateEmailSchema = z.object({
  email: requiredString.email("Invalid email address").toLowerCase(),
});
export type UpdateEmailSchemaInput = z.infer<typeof UpdateEmailSchema>;

// Update password
export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^`+~.-])[A-Za-z\d@$!%*?&#^`+~.-]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmNewPassword: z.string(),
    logOutOtherDevices: z.boolean().default(true).optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
export type UpdatePasswordSchemaInput = z.infer<typeof UpdatePasswordSchema>;

// Update profile picture
export const UpdateAvatarSchema = z.object({
  image: z
    .instanceof(File, { message: "Required" })
    .refine((file) => file.type.startsWith("image/"), "Invalid file type")
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      "Please upload a picture less than 2MB",
    ),
});
export type UpdateAvatarSchemaInput = z.infer<typeof UpdateAvatarSchema>;

// Verification code
export const VerificationCodeSchema = z.object({
  code: trimmedString.min(6, "Your verification code must be 6 characters."),
});
export type VerificationCodeSchemaTypes = z.infer<
  typeof VerificationCodeSchema
>;

// Forgot password
export const ForgotPasswordSchema = z.object({
  email: requiredString.email("Invalid email address").toLowerCase(),
});
export type ForgotPasswordSchemaTypes = z.infer<typeof ForgotPasswordSchema>;

// Reset password
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^`+~.-])[A-Za-z\d@$!%*?&#^`+~.-]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string(),
    logOutOtherDevices: z.boolean().default(true).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordSchemaTypes = z.infer<typeof ResetPasswordSchema>;

// Set up two-factor authentication
export const TwoFactorSetupSchema = z.object({
  code: trimmedString.min(6, "Your code must be 6 characters."),
  encodedTOTPKey: trimmedString.length(28),
});
export type TwoFactorSetupSchemaTypes = z.infer<typeof TwoFactorSetupSchema>;

// Verify two-factor authentication
export const TwoFactorVerificationSchema = z.object({
  code: trimmedString.min(6, "Your code must be 6 characters."),
});
export type TwoFactorVerificationSchemaTypes = z.infer<
  typeof TwoFactorVerificationSchema
>;
