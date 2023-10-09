export function isTokenExpired(decodedToken: any) {
  if (!decodedToken.exp) {
    return true; // Das Token hat kein Ablaufdatum (exp claim)
  }

  const currentTime = Math.floor(Date.now() / 1000); // Aktuelle Zeit in Sekunden seit dem Unix-Epoch

  if (decodedToken.exp < currentTime) {
    return true; // Das Token ist abgelaufen
  }

  if (decodedToken.nbf && decodedToken.nbf > currentTime) {
    return true; // Das Token ist vor dem `nbf`-Zeitpunkt noch nicht gültig
  }

  return false; // Das Token ist nicht abgelaufen und gültig
}
