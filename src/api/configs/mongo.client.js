import * as Realm from 'realm-web';

const DATA_APP_ID = import.meta.env.VITE_DATA_APP_ID;
const AUTH_APP_ID = import.meta.env.VITE_AUTH_APP_ID
const AUTH_APP_PUBLIC_KEY = import.meta.env.VITE_AUTH_APP_PUBLIC_KEY
//export const app: Realm.App = new Realm.App({ id: REALM_APP_ID! });
export const app = new Realm.App({ id: DATA_APP_ID })
export const authApp = new Realm.App({ id: AUTH_APP_ID })
//export const credentials = Realm.Credentials.anonymous(true);
export const credentials = Realm.Credentials.emailPassword('darth_jule@me.com', 'pwdpwd');
export const authCredentials = Realm.Credentials.apiKey(AUTH_APP_PUBLIC_KEY);