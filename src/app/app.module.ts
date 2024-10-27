import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RemoteConfigurationService } from './services/remote-configuration.service';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Vibration],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private remoteConfigService: RemoteConfigurationService) {}
}
