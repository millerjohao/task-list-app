import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getRemoteConfig } from 'firebase/remote-config';

/**
 * Llaves de configuración para firebase
 */
const firebaseConfig = {
  apiKey: 'AIzaSyBm2kWCU7SdbHaFw_NI34gYk2_aKQPztZQ',
  authDomain: 'to-do-app-e6285.firebaseapp.com',
  projectId: 'to-do-app-e6285',
  storageBucket: 'to-do-app-e6285.appspot.com',
  messagingSenderId: '550632470422',
  appId: '1:550632470422:web:9e818b5c3c2d5794218fb7',
  measurementId: 'G-8G6QRYTKD4',
};

/**
 * Inicialización de firebase
 * @type {firebase.app.App}
 */
const app = initializeApp(firebaseConfig);
/**
 * Para obtener las análiticas
 */
const analytics = getAnalytics(app);

/**
 * Para obtener los valores de configuración remotos
 */
// Obtener una instancia de Remote Config
const remoteConfig = getRemoteConfig(app);
remoteConfig.settings.minimumFetchIntervalMillis = 360;

export { app, remoteConfig, analytics };
