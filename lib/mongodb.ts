const MONGODB_DATABASE = process.env.MONGODB_DATABASE ?? "flipkart_clone";

type DataApiAction = "findOne" | "insertOne" | "find";

async function callDataApi(action: DataApiAction, body: Record<string, unknown>) {
  const apiUrl = process.env.MONGODB_DATA_API_URL;
  const apiKey = process.env.MONGODB_DATA_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error("MongoDB Data API environment variables are missing");
  }

  const response = await fetch(`${apiUrl}/${action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey
    },
    body: JSON.stringify({
      dataSource: "Cluster0",
      database: MONGODB_DATABASE,
      ...body
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`MongoDB Data API request failed (${response.status})`);
  }

  return response.json();
}

export async function findOne(collection: string, filter: Record<string, unknown>) {
  const response = await callDataApi("findOne", { collection, filter });
  return response.document ?? null;
}

export async function insertOne(collection: string, document: Record<string, unknown>) {
  const response = await callDataApi("insertOne", { collection, document });
  return response.insertedId as string;
}

export async function findMany(
  collection: string,
  filter: Record<string, unknown>,
  sort?: Record<string, 1 | -1>
) {
  const response = await callDataApi("find", { collection, filter, sort });
  return (response.documents ?? []) as Record<string, unknown>[];
}
