import { Metadata } from "next";
import MainLayout from "@/main-layout";
import Item from "@/item";

export const metadata: Metadata = {
  title: "Item",
};

interface ItemPage {
  params: {
    id: string
  };
}

export default function ItemPage({ params }: ItemPage) {
  const id = params.id;

  return (
    <MainLayout>
      <Item id={id}/>
    </MainLayout>
  );
}