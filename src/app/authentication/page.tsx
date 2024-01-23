import { Metadata } from "next";
import MainLayout from "@/main-layout";
import AuthenticationForm from "@/authorization/authentication/AuthenticationForm";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthenticationPage() {
  return (
    <MainLayout>
      <AuthenticationForm />
    </MainLayout>
  );
}
