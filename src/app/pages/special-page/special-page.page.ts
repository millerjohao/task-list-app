import { Component } from '@angular/core';

@Component({
  selector: 'app-special-page',
  templateUrl: 'special-page.page.html',
  styleUrls: ['special-page.page.scss']
})
/**
 * Página de acceso especial que se activa por medio de featureflags
 */
export class SpecialPage {
  public titleList = "Acceso Especial";

  constructor() {}

}
