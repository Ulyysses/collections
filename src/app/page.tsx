import { collection_list, connectionMongo, item_list } from "@/db/connectMongo";
import MainLayout from "@/main-layout";
import MainPage from "@/main-page";

const Home = async () => {
  await connectionMongo;
    const existingCollections = await collection_list.find({}).exec();
    const existingCollectionIds = existingCollections.map((collection) => collection._id);

    const items = await item_list.find({ collectionId: { $in: existingCollectionIds } }).exec();

    const collectionIdCount: {
      [key: string]: number;
    } = {};
    
    items.forEach((item) => {
      const collectionId = item.collectionId;
      
      if (collectionIdCount[collectionId]) {
        collectionIdCount[collectionId]++;
      } else {
        collectionIdCount[collectionId] = 1;
      }
    });
    
    let mostCommonCollectionId;
    let maxCount = 0;
    
    for (const collectionId in collectionIdCount) {
      if (collectionIdCount[collectionId] > maxCount) {
        mostCommonCollectionId = collectionId;
        maxCount = collectionIdCount[collectionId];
      }
    }

    const mostCommonCollection = JSON.parse(JSON.stringify(await collection_list.findById(mostCommonCollectionId)));

  return (
    <MainLayout>
      <MainPage collection={mostCommonCollection}/>
    </MainLayout>
  );
};

export default Home;
