import { Injectable } from '@angular/core';
import { ITask } from '../core/interfaces/task-structure.interface';

@Injectable({
  providedIn: 'root',
})
export class LogicCoreService {
  private storageKey = 'myLists';
  private categoryKey = 'categories';
  private tasksStorageKey = 'myTasks';

  constructor() {}

  /**
   * Método que obtiene las listas del localstorage
   * @returns 
   */
  getLists(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  /**
   * Método que obtiene lista por id
   * @param listId 
   * @returns 
   */

  getListById(listId: number): any {
    const lists = this.getLists();
    return lists.find((list: any) => list.id === listId);
  }

  /**
   * Método que agrega lista al localstorage
   * @param name nombre de la lista
   */
  addList(name: string): void {
    const currentList = this.getLists();
    const idGenerated = Date.now() + Math.floor(Math.random() * 1000);
    currentList.push({ id: idGenerated, name });
    localStorage.setItem(this.storageKey, JSON.stringify(currentList));
  }

  /**
   * Método que identifica si una lista tiene tareas
   * @param listId id de la lista
   * @returns 
   */
  hasTasks(listId: number): boolean {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    return tasks.some((task: any) => task.listId === listId);
  }

  /**
   * Método que borra lista del localStorage
   * @param id 
   */

  deleteList(id: string): void {
    const currentList = this.getLists();
    const index = currentList.findIndex(list => list.id === id);

    if (index !== -1) {
      currentList.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(currentList));
    }
  }

  /**
   * Método que borra lista con tareas
   * @param listId id de la lista
   */
  deleteListWithTasks(listId: number): void {
    const lists = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const updatedLists = lists.filter((list: any) => list.id !== listId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedLists));

    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    const updatedTasks = tasks.filter((task: any) => task.listId !== listId);
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(updatedTasks));
  }

  /**
   * Método que edita nombre de la lista
   * @param id de la lista
   * @param newName nombre editado
   */

  editList(id: string, newName: string): void {
    const currentList = this.getLists();
    const index = currentList.findIndex(list => list.id === id);

    if (index !== -1) {
      currentList[index].name = newName;
      localStorage.setItem(this.storageKey, JSON.stringify(currentList));
    }
  }

  /**
   * Método que guarda las listas en el localStorage
   * @param lists 
   */

  saveLists(lists: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(lists));
  }

  /**
   * Método que agrega tarea a una lista
   * @param listId id de la lista
   * @param taskName nombre de la tarea
   * @param categoryId id de la categoria
   */   
  addTaskToList(listId: number, taskName: string, categoryId?: number): void {
    const currentLists = this.getLists();
    const list = currentLists.find(l => l.id === listId);
    if (list) {
      list.tasks.push({ id: Date.now(), name: taskName, categoryId });
      this.saveLists(currentLists);
    }
  }

  /**
   * Método que borra tarea de la lista
   * @param listId id de la lista
   * @param taskObject objeto de la tarea   
   */
  deleteTaskFromList(taskObject: string): void {
    const currentTasks = this.getAllTasks();
    const updatedTasks = currentTasks.filter(task => task.id !== taskObject);

    localStorage.setItem(this.tasksStorageKey, JSON.stringify(updatedTasks));
  }

  /**
   * Método que obtiene las categorías de las listas
   * @returns 
   */
  getCategories(): any[] {
    return JSON.parse(localStorage.getItem(this.categoryKey) || '[]');
  }

  /**
   * Método que agrega una categoría al localStorage
   * @param name nombre de la categoría
   */

  addCategory(name: string): void {
    const categories = this.getCategories();
    categories.push({ id: categories.length + 1, name });
    localStorage.setItem(this.categoryKey, JSON.stringify(categories));
  }

  /**
   * Método que edita nombre de la categoría
   * @param id 
   * @param newName 
   */
  editCategory(id: number, newName: string): void {
    const categories = this.getCategories();
    const category = categories.find(cat => cat.id === id);
    if (category) {
      category.name = newName;
      localStorage.setItem(this.categoryKey, JSON.stringify(categories));
    }
  }

  /**
   * Método que borra categoría del localStorage
   * @param id de la categoría
   */
  deleteCategory(id: number): void {
    const categories = this.getCategories();
    const updatedCategories = categories.filter(cat => cat.id !== id);
    localStorage.setItem(this.categoryKey, JSON.stringify(updatedCategories));
  }

  /**
   * Método que obtiene las tareas de una lista
   * @param listId id de la lista
   * @returns 
   */
  getTasks(listId: number): ITask[] {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    return tasks.filter((task: any) => task.listId === listId);
  }

  /**
   * Método que obtiene todas las tareas del localStorage   
   * @returns 
   */
  getAllTasks(): ITask[] {
    return JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
  }

  /**
   * Método que agrega tarea al localStorage   
   * @param listId id de la lista
   * @param taskName nombre de la tarea
   * @param categoryId id de la categoría
   */
  addTask(listId: number, taskName: string, categoryId: number): void {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    const newTask: ITask = {
      id: this.generateIdTask(),
      name: taskName,
      completed: false,
      categoryId: categoryId,
      listId: listId,
    };
    tasks.push(newTask);
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
  }

  /**
   * Método que genera un id único para cada tarea
   * @returns 
   */
  generateIdTask(): string {
    return 'task-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Método que cambia el estado de completado de una tarea
   * @param listId id de la lista
   * @param taskObject objeto completo de una tarea
   */
  toggleTaskCompletion(listId: number, taskObject: any): void {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    const task = tasks.find((t: any) => t.id === taskObject.id && t.listId === listId);

    if (task) {
      task.completed = !task.completed;
      localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
    }
  }
}
