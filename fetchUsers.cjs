const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://deepakr_db_user:4oYOhDfezDMn2jCN@kalpcluster.mr8bacs.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('kp_maven');
    const users = database.collection('users');
    const userList = await users.find({}).toArray();
    console.log("Users:", JSON.stringify(userList, null, 2));
  } finally {
    await client.close();
  }
}

main().catch(console.error);
