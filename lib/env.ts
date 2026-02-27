type PublicEnv = {
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_BASE_URL: string;
};

type ServerEnv = {
  JWT_SECRET?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_CLIENT_EMAIL?: string;
  FIREBASE_PRIVATE_KEY?: string;
};

function requiredValue(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_APP_NAME: requiredValue(
    process.env.NEXT_PUBLIC_APP_NAME,
    "NEXT_PUBLIC_APP_NAME"
  ),
  NEXT_PUBLIC_APP_URL: requiredValue(
    process.env.NEXT_PUBLIC_APP_URL,
    "NEXT_PUBLIC_APP_URL"
  ),
  NEXT_PUBLIC_API_BASE_URL: requiredValue(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "NEXT_PUBLIC_API_BASE_URL"
  )
};

export const serverEnv: ServerEnv = {
  JWT_SECRET: process.env.JWT_SECRET,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY
};
