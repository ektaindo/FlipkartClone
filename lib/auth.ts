import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth_token";

type AuthPayload = {
  userId: string;
  email: string;
  name: string;
  exp: number;
};

function toBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function fromBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signContent(content: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(content).digest("base64url");
}

export function signAuthToken(payload: Omit<AuthPayload, "exp">) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  const fullPayload: AuthPayload = {
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7
  };

  const encoded = toBase64Url(JSON.stringify(fullPayload));
  const signature = signContent(encoded, secret);
  return `${encoded}.${signature}`;
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function clearAuthCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getAuthPayload(): Omit<AuthPayload, "exp"> | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return null;
  }

  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expected = signContent(encodedPayload, secret);
  if (expected !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as AuthPayload;
    if (payload.exp < Date.now()) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email,
      name: payload.name
    };
  } catch {
    return null;
  }
}
