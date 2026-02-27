type PublicEnv = {
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_API_BASE_URL: string;
};

type ServerEnv = {
  NEXTAUTH_URL?: string;
  NEXTAUTH_SECRET?: string;
  DATABASE_URL?: string;
  MONGODB_URI?: string;
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
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  MONGODB_URI: process.env.MONGODB_URI
};
