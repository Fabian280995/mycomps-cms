export interface CompetitionLocation {
  id: string;
  location: {
    address: {
      lat: number;
      lng: number;
    };
  };
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Radius der Erde in Kilometern

  const dLat = degreesToRadians(lat2 - lat1);
  const dLng = degreesToRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function filterCompsByDistance(
  comps: CompetitionLocation[],
  lat: number,
  lng: number,
  maxDistance: number
): string[] {
  return comps
    .filter((comp) => {
      const distance = calculateDistance(
        lat,
        lng,
        comp.location.address.lat,
        comp.location.address.lng
      );
      return distance <= maxDistance;
    })
    .map((comp) => comp.id); // Extrahiert nur die ID jedes Wettkampfs
}
