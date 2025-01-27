export const VITE_PUBLIC_OIDC_CLIENT_ID: string = import.meta.env.VITE_PUBLIC_OIDC_CLIENT_ID || 'api-platform-app';
export const VITE_PUBLIC_OIDC_SERVER_URL: string = import.meta.env.VITE_PUBLIC_OIDC_SERVER_URL || 'https://localhost/oidc';
export const VITE_PUBLIC_OIDC_SERVER_URL_INTERNAL: string = import.meta.env.VITE_PUBLIC_OIDC_SERVER_URL_INTERNAL || 'http://keycloak:8080/oidc';
export const VITE_PUBLIC_OIDC_AUTHORIZATION_CLIENT_ID: string = import.meta.env.VITE_PUBLIC_OIDC_AUTHORIZATION_CLIENT_ID || 'api-platform-api';
export const VITE_PUBLIC_OIDC_REALM: string = import.meta.env.VITE_PUBLIC_OIDC_REALM || 'demo';
