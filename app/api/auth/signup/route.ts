import { NextResponse } from "next/server";
import { setAuthCookie, signAuthToken } from "@/lib/auth";
import { createDocument, queryDocuments } from "@/lib/firebase";
import { hashPassword } from "@/lib/password";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { message: "Name, email and password are required." },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const email = body.email.toLowerCase();
    const existing = await queryDocuments("users", {
      field: "email",
      value: email
    });

    if (existing.length > 0) {
      return NextResponse.json({ message: "Email already registered." }, { status: 409 });
    }

    const id = await createDocument("users", {
      name: body.name,
      email,
      passwordHash: hashPassword(body.password),
      createdAt: new Date().toISOString()
    });

    const token = signAuthToken({ userId: id, email, name: body.name });
    setAuthCookie(token);

    return NextResponse.json({ user: { id, name: body.name, email } });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Signup failed" },
      { status: 500 }
    );
  }
}
