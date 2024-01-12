import { Metadata } from "next";
import MainLayout from "@/main-layout";
import CollectionList from "@/collection-list";

export const metadata: Metadata = {
  title: "Collection list",
};

export default function CollectionListPage() {
  return (
    <MainLayout>
      <CollectionList />
    </MainLayout>
  );
}
