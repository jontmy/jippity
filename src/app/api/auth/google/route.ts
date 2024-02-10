import { generateCodeVerifier, generateState } from "arctic";
import { google } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
    });

    // Get refresh token (only on first sign-in)
    url.searchParams.set("access_type", "offline");

    cookies().set("google_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    cookies().set("google_oauth_code_verifier", codeVerifier, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
    });

    return Response.redirect(url, 302);
}
