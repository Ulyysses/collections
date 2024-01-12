import { getItemList } from "@/db/getItemList";
import { IItem } from "@/types";
import {
  Card,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Text,
  Tag,
  Flex,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ItemListProps {
  collectionId: string;
}

const ItemList = ({ collectionId }: ItemListProps) => {
  const [itemList, setItemList] = useState<IItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const list = await getItemList(collectionId);
        setItemList(list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [collectionId]);

  return (
    <Flex direction="column" gap={2}>
      {itemList.map((item) => (
        <Card overflow="hidden" variant="outline" maxH="200px" key={item._id}>
          <Link href={`/item/${item._id}`}>
            <Stack direction="row" alignItems="center" flex="1">
              <CardBody>
                <Heading size="md">{item.name}</Heading>
                {item.description && <Text py="2">{item.description}</Text>}
              </CardBody>
              <CardFooter display="flex" flexWrap="wrap" maxW="500px">
                {item.tags.map((tag, index) => (
                  <Tag marginRight="2" marginBottom="2" key={index}>
                    {tag}
                  </Tag>
                ))}
              </CardFooter>
            </Stack>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default ItemList;
