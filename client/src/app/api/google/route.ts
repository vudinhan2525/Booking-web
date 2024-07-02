import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: request.code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange authorization code for access token");
    }

    const data = await response.json();
    const { id_token, access_token } = data;

    // Optional: Validate ID token and process access token

    return NextResponse.json({ id_token, access_token });
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    return NextResponse.json(
      { error: "Failed to exchange authorization code for access token" },
      { status: 500 }
    );
  }
}
