export function removeEmptyFields<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;

    if (typeof value === "object" && !Array.isArray(value)) {
      // recurse into nested object
      const nested = removeEmptyFields(value);
      if (Object.keys(nested).length > 0) {
        result[key] = nested;
      }
    } else {
      result[key] = value;
    }
  }

  return result as Partial<T>;
}
