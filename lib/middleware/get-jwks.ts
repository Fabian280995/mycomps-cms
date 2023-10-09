const url = new URL(`${process.env.JWKS_URL}`);

export async function getJWKS() {
  try {
    const res = await fetch(url, {
      method: "GET",
    });
    const jwks = await res.json();
    return jwks;
  } catch (error: any) {
    throw new Error("JWKS fetch failed: " + error.message);
  }
}
