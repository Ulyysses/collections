import { Metadata } from "next";
import MainLayout from "@/main-layout";
import RegistrationForm from "@/authorization/registration/RegistrationForm";

export const metadata: Metadata = {
  title: "Registration",
};

export default function RegistrationPage() {
  return (
    <MainLayout>
      <RegistrationForm />
    </MainLayout>
  );
}
