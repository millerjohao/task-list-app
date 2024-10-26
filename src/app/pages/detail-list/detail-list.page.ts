import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-list',
  templateUrl: 'detail-list.page.html',
  styleUrls: ['detail-list.page.scss'],
})
export class DetailListPage {
  tasks: { id: number; name: string }[] = [];

  constructor() {}

  addTask(name: string) {
    const newTask = { id: Date.now(), name };
    this.tasks.push(newTask);
    //this.saveTasksToLocalStorage();
  }
}
