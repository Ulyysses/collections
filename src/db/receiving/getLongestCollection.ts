"use server";

import { collection_list, connectionMongo, item_list } from "../connectMongo";

export const getLongestCollection = async () => {
  try {
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

    return JSON.parse(JSON.stringify(await collection_list.findById(mostCommonCollectionId)));
  } catch (error) {
    console.log(error);
    throw error;
  }
};
