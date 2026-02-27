import crypto from "crypto";

type Primitive = string | number | boolean | null;
type JsonValue = Primitive | JsonValue[] | { [key: string]: JsonValue };

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

function requireFirebaseEnv() {
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Missing Firebase service account environment variables");
  }
}

function base64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken() {
  requireFirebaseEnv();

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: FIREBASE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/datastore",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64Url(JSON.stringify(header));
  const encodedPayload = base64Url(JSON.stringify(payload));
  const unsigned = `${encodedHeader}.${encodedPayload}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const signature = signer.sign(FIREBASE_PRIVATE_KEY as string);

  const jwt = `${unsigned}.${base64Url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  if (!response.ok) {
    throw new Error(`Unable to get Firebase access token (${response.status})`);
  }

  const json = (await response.json()) as { access_token: string };
  return json.access_token;
}

function toFirestoreValue(value: JsonValue): Record<string, unknown> {
  if (value === null) {
    return { nullValue: null };
  }

  if (typeof value === "string") {
    return { stringValue: value };
  }

  if (typeof value === "boolean") {
    return { booleanValue: value };
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { integerValue: String(value) };
    }

    return { doubleValue: value };
  }

  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((item) => toFirestoreValue(item))
      }
    };
  }

  return {
    mapValue: {
      fields: Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, toFirestoreValue(item)])
      )
    }
  };
}

function fromFirestoreValue(value: Record<string, unknown>): JsonValue {
  if ("nullValue" in value) return null;
  if ("stringValue" in value) return String(value.stringValue);
  if ("booleanValue" in value) return Boolean(value.booleanValue);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);

  if ("arrayValue" in value) {
    const arrayValue = value.arrayValue as { values?: Record<string, unknown>[] };
    return (arrayValue.values ?? []).map((item) => fromFirestoreValue(item));
  }

  if ("mapValue" in value) {
    const mapValue = value.mapValue as {
      fields?: Record<string, Record<string, unknown>>;
    };
    const entries = Object.entries(mapValue.fields ?? {}).map(([key, item]) => [
      key,
      fromFirestoreValue(item)
    ]);
    return Object.fromEntries(entries);
  }

  return null;
}

async function firestoreRequest(path: string, init?: RequestInit) {
  requireFirebaseEnv();
  const token = await getAccessToken();

  const response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(`Firestore request failed (${response.status})`);
  }

  return response.json();
}

function parseDocument(document: {
  name: string;
  fields?: Record<string, Record<string, unknown>>;
}) {
  const id = document.name.split("/").pop() ?? "";
  const data = Object.fromEntries(
    Object.entries(document.fields ?? {}).map(([key, value]) => [
      key,
      fromFirestoreValue(value)
    ])
  );

  return { id, ...data } as Record<string, JsonValue>;
}

function fieldMap(data: Record<string, JsonValue>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, toFirestoreValue(value)])
  );
}

export async function createDocument(
  collection: string,
  data: Record<string, JsonValue>
) {
  const id = crypto.randomUUID();

  await firestoreRequest(`/${collection}?documentId=${id}`, {
    method: "POST",
    body: JSON.stringify({ fields: fieldMap(data) })
  });

  return id;
}

export async function queryDocuments(
  collection: string,
  options: {
    field: string;
    value: JsonValue;
    orderBy?: string;
    direction?: "ASCENDING" | "DESCENDING";
  }
) {
  const body = {
    structuredQuery: {
      from: [{ collectionId: collection }],
      where: {
        fieldFilter: {
          field: { fieldPath: options.field },
          op: "EQUAL",
          value: toFirestoreValue(options.value)
        }
      },
      ...(options.orderBy
        ? {
            orderBy: [
              {
                field: { fieldPath: options.orderBy },
                direction: options.direction ?? "ASCENDING"
              }
            ]
          }
        : {})
    }
  };

  const response = (await firestoreRequest(`:runQuery`, {
    method: "POST",
    body: JSON.stringify(body)
  })) as {
    document?: { name: string; fields?: Record<string, Record<string, unknown>> };
  }[];

  return response
    .filter((item) => item.document)
    .map((item) =>
      parseDocument(
        item.document as {
          name: string;
          fields?: Record<string, Record<string, unknown>>;
        }
      )
    );
}
