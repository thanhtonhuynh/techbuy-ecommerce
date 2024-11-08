import { User } from "@/lib/auth/session";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

ResetPasswordEmail.PreviewProps = {
  token: "123456",
};

export default function ResetPasswordEmail({
  user,
  token,
}: {
  user: User;
  token: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Hello {user.name}, Ongba EMS received a request to reset your password.
        Click the link to continue with the password reset process.
      </Preview>
      <Tailwind>
        <React.Fragment>
          <Body className="mx-auto my-auto bg-white font-sans">
            <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
              <Section className="mb-[32px] mt-[32px]">
                <Img
                  src={`${process.env.BASE_URL}/ongbaLogo.png`}
                  alt="Ongba EMS Logo"
                  className="mx-auto aspect-square h-[200px] w-[200px] object-cover"
                />

                <Text className="mb-8 text-[14px] font-medium leading-[24px] text-black">
                  Hello {user.name}, Ongba EMS received a request to reset your
                  password. If you didn't make the request, you can safely
                  ignore this email.
                </Text>

                <Text className="mb-8 text-[14px] font-medium leading-[24px] text-black">
                  Otherwise, click the following link to continue with the
                  password reset process:
                </Text>

                <Text className="text-[14px] font-medium leading-[24px] text-black">
                  <Link
                    href={`${process.env.BASE_URL}/reset-password/${token}`}
                    target="_blank"
                    className="rounded bg-black p-2 text-white underline"
                  >
                    Reset Password
                  </Link>
                </Text>

                <Text className="mt-8 text-[14px] font-medium leading-[24px] text-black">
                  This link will expire in 30 minutes.
                </Text>
              </Section>

              <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

              <Text className="flex items-center justify-center text-[12px] leading-[24px] text-muted-foreground">
                &copy; {new Date().getFullYear()} Ongba EMS. All rights
                reserved.
              </Text>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
