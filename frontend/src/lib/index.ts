export function ISODateToUnix(date: string): number {
  return new Date(date).getTime();
}

export function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
