import { NextResponse } from "next/server";
import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { findOne } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";

type UserRecord = {
  _id: string;
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
    const user = (await findOne("users", { email })) as UserRecord | null;

    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
    }

    const userId = String(user._id);
    const token = signAuthToken({ userId, email: user.email, name: user.name });
    setAuthCookie(token);

    return NextResponse.json({
      user: { id: userId, name: user.name, email: user.email }
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Login failed" },
      { status: 500 }
    );
  }
}
