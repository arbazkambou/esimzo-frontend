export const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const capitalize = (str: string | null | undefined) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
