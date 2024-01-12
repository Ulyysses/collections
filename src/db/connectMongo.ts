const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SaninaUlyana:${process.env.MONGODB_PASSWORD}@collections.zfhzge0.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async() => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
