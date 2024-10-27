import { Injectable } from '@angular/core';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { remoteConfig } from '../config/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfigurationService {
  constructor() {
    this.initializeRemoteConfig();
  }

  /**
   * Método para inicializar el remote config
   * y obtener los valores de las variables de configuracion
   * @returns {Promise<void>} Promesa que se resuelve cuando se ha inicializado el remote config
   * @memberof RemoteConfigurationService
   */
  public async initializeRemoteConfig() {
    try {
      await fetchAndActivate(remoteConfig);
      console.log('Remote Config activado y sincronizado');

      const featureEnabled = getValue(remoteConfig, 'new_feature_flag').asBoolean();
      console.log('Funcionalidad:', featureEnabled);
    } catch (error) {
      console.error('Error al inicializar Remote Config:', error);
    }
  }

  /**
   * Método para obtener la variable de remote flag
   * @param flagName 
   * @returns 
   */

  getFeatureFlag(flagName: string): boolean {
    return getValue(remoteConfig, flagName).asBoolean();
  }
}
