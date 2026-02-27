type PublicEnv = {
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_BASE_URL: string;
};

type ServerEnv = {
  JWT_SECRET?: string;
  MONGODB_DATA_API_URL?: string;
  MONGODB_DATA_API_KEY?: string;
  MONGODB_DATABASE?: string;
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
  MONGODB_DATA_API_URL: process.env.MONGODB_DATA_API_URL,
  MONGODB_DATA_API_KEY: process.env.MONGODB_DATA_API_KEY,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE
};
