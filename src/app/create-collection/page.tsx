import { Metadata } from "next";
import MainLayout from "@/main-layout";
import CollectionForm from "@/collection-form";

export const metadata: Metadata = {
  title: "Create a collection",
};

export default function CollectionFormPage() {
  return (
    <MainLayout>
      <CollectionForm />
    </MainLayout>
  );
}
