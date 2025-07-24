import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "tanit"; // nom de la base, tu peux le changer
const collectionName = "avis";

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  if (req.method === "GET") {
    const avis = await collection.find({}).sort({ _id: -1 }).toArray();
    res.status(200).json(avis);
  } else if (req.method === "POST") {
    const { name, city, text, rating, avatar } = req.body;
    if (!name || !city || !text || !rating || !avatar) {
      return res.status(400).json({ message: "Champs manquants" });
    }
    const result = await collection.insertOne({ name, city, text, rating, avatar });
    res.status(201).json({ _id: result.insertedId, name, city, text, rating, avatar });
  } else {
    res.status(405).end();
  }
} 