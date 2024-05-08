export default function objectToQueryString(
  params: Record<string, any>
): string {
  const queryString = Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (value === null || value === undefined) {
        return "";
      }
      if (Array.isArray(value)) {
        return value
          .map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean) // Remove any empty strings
    .join("&");

  return queryString;
}
