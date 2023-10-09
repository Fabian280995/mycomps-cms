import jwt from "jsonwebtoken";
import { getJwtToken } from "./get-jwt-token";
import { getPublicKey } from "./get-public-key";
import { isTokenExpired } from "./is-token-expired";
import { NextRequest } from "next/server";
import { getJWKS } from "./get-jwks";
import { getJwkFromJwks } from "./get-jwk-from-jwks";
import jwkToPem from "jwk-to-pem";

export async function verifyJwtToken(req: NextRequest) {
  try {
    const jwtToken = getJwtToken(req);
    /* 
    const publicKey = getPublicKey(); */

    const jwks = await getJWKS();
    const jwk = await getJwkFromJwks(jwks, jwtToken);

    const publicKey = jwkToPem(jwk);
    console.log("PEM PUBLIC KEY", publicKey);

    if (!jwtToken || !publicKey) {
      throw new Error("Missing JWT token or public key");
    }

    const decoded = jwt.verify(jwtToken, publicKey, {
      algorithms: ["RS256"],
    });

    if (isTokenExpired(decoded)) {
      throw new Error("JWT token expired");
    }
  } catch (error: any) {
    throw new Error("JWT verification failed: " + error.message);
  }
}
