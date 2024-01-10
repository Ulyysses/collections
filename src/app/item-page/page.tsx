import { Metadata } from "next";
import MainLayout from "@/main-layout";
import Item from "@/item";

export const metadata: Metadata = {
  title: "Item",
};

export default function ItemPage() {
  return (
    <MainLayout>
      <Item />
    </MainLayout>
  );
}