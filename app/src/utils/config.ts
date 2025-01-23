// export const ENTRYPOINT = "https://php/docs.jsonopenapi";
export const ENTRYPOINT = typeof window === "undefined" ? process.env.API_PUBLIC_ENTRYPOINT : window.origin;
