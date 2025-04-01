import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./types";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session || undefined) {
    console.log("Error decrypting session: session is empty or undefined");
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Error decrypting session:", error);
    return null;
  }
}

export async function createSession(userId: string, rememberMe: boolean) {
  const expiresInMs = rememberMe
    ? 7 * 24 * 60 * 60 * 1000 // 7 days
    : 1 * 24 * 60 * 60 * 1000; // 1 day

  const expiresAt = new Date(Date.now() + expiresInMs);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}
export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
