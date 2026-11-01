import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// 개발 중 핫 리로드 때마다 연결이 새로 생기지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection() {
  const client = await getMongoClient();
  const dbName = process.env.MONGODB_DB ?? "linknamu";
  return client.db(dbName).collection<{ _id: string; count: number }>("clicks");
}
