import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-item-list',
  templateUrl: './custom-item-list.component.html',
  styleUrls: ['./custom-item-list.component.scss'],
})
export class CustomItemListComponent  implements OnInit {

  @Input() listItem: any;
  @Output() redirectPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  onItemSelected() {
    this.redirectPage.emit(this.listItem.id);
  }
}
