export function pick<T extends object, U extends keyof T>(
  obj: T,
  paths: Array<U>
): Pick<T, U> {
  const ret = Object.create(null);
  for (const k of paths) {
    ret[k] = obj[k];
  }
  return ret;
}

export function normalizeDate(dateStr: string): Date | null {
  if (dateStr) {
    const date = new Date(dateStr);
    date.setHours(12, 0, 0, 0);
    return date;
  }
  return null;
}
