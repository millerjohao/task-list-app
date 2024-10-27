import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from 'src/app/core/interfaces/task-structure.interface';
import { LogicCoreService } from 'src/app/services/logic-core.service';

@Component({
  selector: 'app-detail-list',
  templateUrl: 'detail-list.page.html',
  styleUrls: ['detail-list.page.scss'],
})
export class DetailListPage implements OnInit {
  public route = inject(ActivatedRoute);
  public logicCoreService = inject(LogicCoreService);
  public tasks: ITask[] = [];
  public filteredTasks: ITask[] = [];
  public listId!: number;
  public newTaskName: string = '';
  public selectedCategoryId: number | null = null;
  public categories: any[] = [];
  public titleList!: string;
  
  constructor() {
    this.listId = Number(this.route.snapshot.paramMap.get('id'));
    this.titleList = this.logicCoreService.getListById(this.listId).name;        
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
  }

  loadTasks() {
    this.tasks = this.logicCoreService.getTasks(this.listId);
    this.filteredTasks = this.tasks;
  }

  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

  addTask(event: { name: string; categoryId: number }) {
    this.logicCoreService.addTask(this.listId, event.name, event.categoryId);
    this.loadTasks();
  }

  toggleTaskCompletion(taskId: string) {
    this.logicCoreService.toggleTaskCompletion(this.listId, taskId);
    this.loadTasks();
  }

  filterTasks() {
    if (this.selectedCategoryId) {
      this.filteredTasks = this.tasks.filter(task => task.categoryId === this.selectedCategoryId);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  deleteTask(taskId: any) {
    this.logicCoreService.deleteTaskFromList(this.listId, taskId);
    this.loadTasks();
  }

  onCategoryUpdated() {
    this.loadCategories();
  }
}
