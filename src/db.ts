import { Collection, Db, MongoClient } from "mongodb";

let client: MongoClient = null;
let db: Db = null;

export type PasswordDoc = {
  name: string;
  value: string;
};

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export function getCollection<T>(collectionName: string): Collection<T> {
  return db.collection<T>(collectionName);
}

export async function closeDB() {
  client.close();
}

export async function createPasswordDoc(
  passwordDoc: PasswordDoc
): Promise<Boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  const createResault = await passwordCollection.insertOne(passwordDoc);
  return createResault.insertedCount >= 1;
}

export async function readPasswordDoc(passwordName: string) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.findOne({ name: passwordName });
}

export async function updatePasswordDoc(
  passwordName: string,
  fieldToUpdate: Partial<PasswordDoc>
): Promise<Boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  const updateResault = await passwordCollection.updateOne(
    { name: passwordName },
    { $set: fieldToUpdate }
  );
  return updateResault.modifiedCount >= 1;
}

export async function updatePasswordValue(
  passwordName: string,
  newPasswordValue: string
): Promise<Boolean> {
  return await updatePasswordDoc(passwordName, { value: newPasswordValue });
}

export async function deletePasswordDoc(
  passwordName: string
): Promise<Boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  const deleteResault = await passwordCollection.deleteOne({
    name: passwordName,
  });
  return deleteResault.deletedCount >= 1;
}
