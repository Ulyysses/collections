import { Metadata } from "next";
import MainLayout from "@/main-layout";
import Collection from "@/collection";
import { connectionMongo, item_list } from "@/db/connectMongo";

export const metadata: Metadata = {
  title: "Collection",
};

interface CollectionPage {
  params: {
    id: string
  };
}

export default async function CollectionPage({ params }: CollectionPage) {
  const id = params.id;

  await connectionMongo;
  const query = { collectionId: id };
  const items = JSON.parse(JSON.stringify(await item_list.find(query)));
  
  return (
    <MainLayout>
      <Collection id={id} items={items}/>
    </MainLayout>
  );
}
 