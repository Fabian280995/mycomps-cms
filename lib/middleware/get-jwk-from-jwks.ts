import jwt from "jsonwebtoken";

export function getJwkFromJwks(jwks: any, jwtToken: string) {
  const decodedToken = jwt.decode(jwtToken, { complete: true });

  if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
    throw new Error("Invalid JWT token.");
  }

  const kid = decodedToken.header.kid;

  // Finde den passenden öffentlichen Schlüssel im JWKS anhand des kid.
  const publicKeyInfo = jwks.keys.find((key: any) => key.kid === kid);

  if (!publicKeyInfo || !publicKeyInfo.n) {
    throw new Error("Public key not found or invalid format in JWKS.");
  }

  // Rückgabe des Modulus (n) des öffentlichen Schlüssels ohne Formatierung.
  return publicKeyInfo;
}
