import { Metadata } from "next";
import MainLayout from "@/main-layout";
import Item from "@/item";
import { connectionMongo, item_list } from "@/db/connectMongo";

export const metadata: Metadata = {
  title: "Item",
};

interface ItemPage {
  params: {
    id: string
  };
}

export default async function ItemPage({ params }: ItemPage) {
  const id = params.id;

  await connectionMongo;
  const item = JSON.parse(JSON.stringify(await item_list.findById(id)));

  return (
    <MainLayout>
      <Item id={id} item={item}/>
    </MainLayout>
  );
}