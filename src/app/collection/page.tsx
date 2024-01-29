import { Metadata } from "next";
import MainLayout from "@/main-layout";
import CollectionList from "@/collection-list";
import { collection_list, connectionMongo } from "@/db/connectMongo";

export const metadata: Metadata = {
  title: "Collection list",
};

export default async function CollectionListPage() {
  await connectionMongo;
  const collectionsData = JSON.parse(JSON.stringify(await collection_list.find({})));

  return (
    <MainLayout>
      <CollectionList collectionList={collectionsData}/>
    </MainLayout>
  );
}
