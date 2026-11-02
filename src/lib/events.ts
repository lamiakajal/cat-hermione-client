export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Healthcare",
  "Education",
  "Awareness",
  "Relief",
  "Other",
] as const;

export const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80";

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatDateTime = (iso: string): string =>
  new Date(iso).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const isPast = (iso: string): boolean =>
  new Date(iso).getTime() <= Date.now();

// <input type="datetime-local"> wants local time, not UTC
export const toLocalInput = (d: Date): string => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
