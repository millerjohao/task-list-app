import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-item-list',
  templateUrl: './custom-item-list.component.html',
  styleUrls: ['./custom-item-list.component.scss'],
})
export class CustomItemListComponent {
  @Input() listItem: any;
  @Output() redirectPage = new EventEmitter<number>();

  constructor() {}  
  /**
   * Método que emite el valor del id de la lista seleccionada al componente padre
   */   
  onItemSelected() {
    this.redirectPage.emit(this.listItem.id);
  }
}
