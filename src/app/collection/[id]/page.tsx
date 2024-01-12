import { Metadata } from "next";
import MainLayout from "@/main-layout";
import Collection from "@/collection";

export const metadata: Metadata = {
  title: "Collection",
};

interface CollectionPage {
  params: {
    id: string
  };
}

export default function CollectionPage({ params }: CollectionPage) {
  const id = params.id;
  
  return (
    <MainLayout>
      <Collection id={id}/>
    </MainLayout>
  );
}
