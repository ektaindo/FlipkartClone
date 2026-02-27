"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MeResponse = {
  user: {
    userId: string;
    name: string;
    email: string;
  } | null;
};

export function AuthStatus() {
  const [user, setUser] = useState<MeResponse["user"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMe() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const json = (await response.json()) as MeResponse;
        setUser(json.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadMe();
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  if (loading) {
    return <span className="text-xs text-blue-100">Loading...</span>;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-blue-100">Hi, {user.name}</span>
      <button className="text-xs underline" onClick={logout} type="button">
        Logout
      </button>
    </div>
  );
}
