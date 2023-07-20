export function formatAltitude(altitude: number): string {
  if (altitude >= 180) {
    return `FL${altitude}`;
  }

  return `${(altitude * 100).toLocaleString()} feet`;
}
