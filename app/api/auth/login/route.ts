import { NextResponse } from "next/server";
import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { queryDocuments } from "@/lib/firebase";
import { verifyPassword } from "@/lib/password";

type UserRecord = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase();
    const users = (await queryDocuments("users", {
      field: "email",
      value: email
    })) as unknown as UserRecord[];

    const user = users[0];
    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const token = signAuthToken({ userId: user.id, email: user.email, name: user.name });
    setAuthCookie(token);

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Login failed" },
      { status: 500 }
    );
  }
}
