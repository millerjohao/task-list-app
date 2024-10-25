import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-lists',
  templateUrl: 'my-lists.page.html',
  styleUrls: ['my-lists.page.scss'],
})
export class MyListsPage {
  public myLists = [
    {
      id: 1,
      name: 'Oficios',
    },
    {
      id: 2,
      name: 'Tareas del hogar',
    },
    {
      id: 3,
      name: 'Curso backend',
    },
    {
      id: 4,
      name: 'Mercado',
    },
  ];

  /* public myLists: Observable<any>; */

  constructor() {
    /* this.myLists = aquiServiceData */
  }
}
