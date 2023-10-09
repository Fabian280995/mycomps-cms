export function getPublicKey() {
  const pemPublicKey = process.env.CLERK_PEM_PUBLIC_KEY;
  return pemPublicKey?.replace(/\\n/g, "\n");
}
