import { NextRequest } from "next/server";

export function getJwtToken(req: NextRequest) {
  const auth = req.headers.get("Authorization");

  if (!auth) {
    throw new Error("Authorization header missing.");
  }
  return auth.replace("Bearer ", "");
}
