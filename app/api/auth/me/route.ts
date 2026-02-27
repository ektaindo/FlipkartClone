import { NextResponse } from "next/server";
import { getAuthPayload } from "@/lib/auth";

export async function GET() {
  const payload = getAuthPayload();

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user: payload });
}
