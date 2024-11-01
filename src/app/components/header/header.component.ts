import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * Variables de entrada
   */   
  @Input() title: string = '';
  @Input() hasReturn: boolean = false;
}
