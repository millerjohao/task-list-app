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

  getLists(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getListById(listId: number): any {
    const lists = this.getLists();
    return lists.find((list: any) => list.id === listId);
  }

  addList(name: string): void {
    const currentList = this.getLists();
    const idGenerated = Date.now() + Math.floor(Math.random() * 1000);
    currentList.push({ id: idGenerated, name });
    localStorage.setItem(this.storageKey, JSON.stringify(currentList));
  }
  hasTasks(listId: number): boolean {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    return tasks.some((task: any) => task.listId === listId);
  }

  deleteList(id: string): void {
    const currentList = this.getLists();
    const index = currentList.findIndex(list => list.id === id);

    if (index !== -1) {
      currentList.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(currentList));
    }
  }
  deleteListWithTasks(listId: number): void {
    const lists = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const updatedLists = lists.filter((list: any) => list.id !== listId);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedLists));

    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    const updatedTasks = tasks.filter((task: any) => task.listId !== listId);
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(updatedTasks));
  }

  editList(id: string, newName: string): void {
    const currentList = this.getLists();
    const index = currentList.findIndex(list => list.id === id);

    if (index !== -1) {
      currentList[index].name = newName;
      localStorage.setItem(this.storageKey, JSON.stringify(currentList));
    }
  }

  saveLists(lists: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(lists));
  }

  addTaskToList(listId: number, taskName: string, categoryId?: number): void {
    const currentLists = this.getLists();
    const list = currentLists.find(l => l.id === listId);
    if (list) {
      list.tasks.push({ id: Date.now(), name: taskName, categoryId });
      this.saveLists(currentLists);
    }
  }

  deleteTaskFromList(listId: number, taskId: string): void {
    const currentTasks = this.getAllTasks();
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(updatedTasks));
  }

  getCategories(): any[] {
    return JSON.parse(localStorage.getItem(this.categoryKey) || '[]');
  }

  addCategory(name: string): void {
    const categories = this.getCategories();
    categories.push({ id: categories.length + 1, name });
    localStorage.setItem(this.categoryKey, JSON.stringify(categories));
  }

  editCategory(id: number, newName: string): void {
    const categories = this.getCategories();
    const category = categories.find(cat => cat.id === id);
    if (category) {
      category.name = newName;
      localStorage.setItem(this.categoryKey, JSON.stringify(categories));
    }
  }

  deleteCategory(id: number): void {
    const categories = this.getCategories();
    const updatedCategories = categories.filter(cat => cat.id !== id);
    localStorage.setItem(this.categoryKey, JSON.stringify(updatedCategories));
  }

  getTasks(listId: number): ITask[] {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    return tasks.filter((task: any) => task.listId === listId);
  }

  getAllTasks(): ITask[] {
    return JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
  }

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

  generateIdTask(): string {
    return 'task-' + Math.random().toString(36).substr(2, 9);
  }

  toggleTaskCompletion(listId: number, taskId: string): void {
    const tasks = JSON.parse(localStorage.getItem(this.tasksStorageKey) || '[]');
    const task = tasks.find((t: any) => t.id === taskId && t.listId === listId);
    if (task) {
      task.completed = !task.completed;
      localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
    }
  }
}
