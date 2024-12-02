import { MongoClient } from "mongodb";

const connectionUrl = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

const mongoClient = new MongoClient(connectionUrl);

async function main() {
  await mongoClient.connect();
  console.log("Connected successfully to server");
  const db = mongoClient.db(dbName);

  return "done";
}

main().then(console.log).catch(console.error);
