export function ISODateToUnix(date: string): number {
  return new Date(date).getTime();
}
