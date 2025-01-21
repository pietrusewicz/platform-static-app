export const ENTRYPOINT = typeof window === "undefined" ? process.env.API_PUBLIC_ENTRYPOINT : window.origin;
