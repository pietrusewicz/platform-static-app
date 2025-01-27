import type { useAuthStore } from '@/stores/auth/auth';
import { VITE_PUBLIC_OIDC_CLIENT_ID, VITE_PUBLIC_OIDC_SERVER_URL, VITE_PUBLIC_OIDC_REALM} from '@/utils/keycloak';
import Keycloak from 'keycloak-js';

const options = {
  url: `${VITE_PUBLIC_OIDC_SERVER_URL}`,
  clientId: VITE_PUBLIC_OIDC_CLIENT_ID,
  realm: VITE_PUBLIC_OIDC_REALM
};

const keycloak = new Keycloak(options);
let authenticated: boolean = false;;
let store = null;

/**
 * Initializes Keycloak, then run callback. This will prompt you to login.
 *
 * @param onAuthenticatedCallback
 */
async function init(onInitCallback: () => void) {
  try {
    authenticated = await keycloak.init({ 
      onLoad: "login-required",
      idToken: 'keycloak',
      pkceMethod: 'S256',

    
    })
    onInitCallback();
  } catch (error) {
    console.error("Keycloak init failed")
    console.error(error)
  }
};

/**
 * Initializes store with Keycloak user data
 *
 */
async function initStore(storeInstance: ReturnType<typeof useAuthStore>) {
  try {
    store = storeInstance
    store.initOauth(keycloak)

    // Show alert if user is not authenticated
    if (!authenticated) { alert("not authenticated") }
  } catch (error) {
    console.error("Keycloak init failed")
    console.error(error)
  }
};

/**
 * Logout user
 */
function logout(url?: string) {
  keycloak.logout({ redirectUri: url });
}

/**
 * Refreshes token
 */
async function refreshToken() {
  try {
    await keycloak.updateToken(480);
    return keycloak;
  } catch (error) {
    console.error('Failed to refresh token');
    console.error(error);
  }
}

const keycloakService = {
  CallInit: init,
  CallInitStore: initStore,
  CallLogout: logout,
  CallTokenRefresh: refreshToken
};

export default keycloakService;