import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ITask } from 'src/app/core/interfaces/task-structure.interface';
import { LogicCoreService } from 'src/app/services/logic-core.service';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@Component({
  selector: 'app-detail-list',
  templateUrl: 'detail-list.page.html',
  styleUrls: ['detail-list.page.scss'],
})
export class DetailListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll!: IonInfiniteScroll;
  @ViewChild('taskContainer') taskContainer!: ElementRef;
  public route = inject(ActivatedRoute);
  public logicCoreService = inject(LogicCoreService);
  public tasks: ITask[] = [];
  public filteredTasks: ITask[] = [];
  public listId!: number;
  public newTaskName: string = '';
  public selectedCategoryId: number | null = null;
  public categories: any[] = [];
  public titleList!: string;
  public paginatedTasks: ITask[] = [];
  public page: number = 0;
  public pageSize: number = 20;
  public audio: HTMLAudioElement;
  public vibration = inject(Vibration);

  constructor() {
    this.audio = new Audio('assets/sounds/tap_notification.mp3');
    this.listId = Number(this.route.snapshot.paramMap.get('id'));
    this.titleList = this.logicCoreService.getListById(this.listId).name;
  }

  ngOnInit(): void {
    this.loadTasks();
    this.loadCategories();
  }

  loadTasks() {
    this.tasks = this.logicCoreService.getTasks(this.listId);
    this.filteredTasks = this.selectedCategoryId
      ? this.tasks.filter(task => task.categoryId === this.selectedCategoryId)
      : this.tasks;
    this.paginatedTasks = this.filteredTasks.slice(0, this.pageSize);
  }

  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

  addTask(event: { name: string; categoryId: number }) {
    this.logicCoreService.addTask(this.listId, event.name, event.categoryId);
    this.loadTasks();
  }

  toggleTaskCompletion(task: any, event: any) {
    if (!event.target.checked) {
      this.audio.play();
      this.vibration.vibrate(200);
    }
    this.logicCoreService.toggleTaskCompletion(this.listId, task);
    this.loadTasks();
  }

  filterTasks() {
    this.ionInfiniteScroll.disabled = false;
    if (this.selectedCategoryId) {
      this.filteredTasks = this.tasks.filter(task => task.categoryId === this.selectedCategoryId);
    } else {
      this.filteredTasks = this.tasks;
    }
    this.page = 0;
    this.paginatedTasks = this.filteredTasks.slice(0, this.pageSize);
    this.loadTasks();
  }

  updatePaginatedTasks() {
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTasks = this.filteredTasks.slice(start, end);
  }

  deleteTask(task: any) {
    this.vibration.vibrate(200);
    this.logicCoreService.deleteTaskFromList(task.id);
    this.loadTasks();
  }

  onCategoryUpdated() {
    this.loadCategories();
  }

  getPredominantCategory(): number | null {
    if (this.filteredTasks.length === 0) {
      return null;
    }

    const categoryCount: { [key: number]: number } = {};

    // Contar las ocurrencias de cada categoría
    this.filteredTasks.forEach(task => {
      if (categoryCount[task.categoryId]) {
        categoryCount[task.categoryId]++;
      } else {
        categoryCount[task.categoryId] = 1;
      }
    });

    // Encontrar la categoría con la mayor cantidad de ocurrencias
    const predominantCategoryId = Object.keys(categoryCount).reduce((a: any, b: any) => {
      return categoryCount[a] > categoryCount[b] ? a : b;
    });

    return Number(predominantCategoryId);
  }

  loadMoreData() {
    this.page++;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;

    // Obtiene más tareas según el rango
    const newTasks = this.filteredTasks.slice(start, end);
    this.paginatedTasks = [...this.paginatedTasks, ...newTasks];

    // Finaliza el evento de infinite scroll
    this.ionInfiniteScroll.complete();

    // Si no hay más tareas, se desactiva el infinite scroll
    if (newTasks.length < this.pageSize) {
      this.ionInfiniteScroll.disabled = true;
    }
  }

  appendTask(task: ITask) {
    // Agregar la nueva tarea a la lista principal
    this.tasks.push(task);
    this.logicCoreService.addTask(this.listId, task.name, task.categoryId);

    // Verificar si la tarea debe mostrarse en la lista filtrada
    if (this.selectedCategoryId === null || this.selectedCategoryId === task.categoryId) {
      this.filteredTasks.push(task); // Agregar la nueva tarea filtrada

      // Actualizar la lista paginada solo añadiendo la nueva tarea
      this.paginatedTasks.push(task);

      // Esperar un momento para asegurar que la tarea se haya añadido al DOM
      setTimeout(() => this.scrollToBottom(), 100);
    }
    this.loadTasks();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.taskContainer.nativeElement) {
        this.taskContainer.nativeElement.scrollTop = this.taskContainer.nativeElement.scrollHeight;
      }
    }, 100); // Timeout para asegurar el renderizado antes de desplazar
  }
}
