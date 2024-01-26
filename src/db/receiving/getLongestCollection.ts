"use server";

import { collection_list, connectionMongo, item_list } from "../connectMongo";

export const getLongestCollection = async () => {
  try {
    await connectionMongo;
    const items = item_list.find({}).exec();

    const collectionIdCount: {
      [key: string]: number;
    } = {};

    (await items).forEach((item) => {
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

    return await collection_list.findById(mostCommonCollectionId).lean();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
