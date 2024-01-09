import { Metadata } from "next";
import MainLayout from "@/main-layout";
import Collection from "@/collection";

export const metadata: Metadata = {
  title: "Collection",
};

export default function CollectionPage() {
  return (
    <MainLayout>
      <Collection />
    </MainLayout>
  );
}
