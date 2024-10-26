import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogicCoreService {
  private storageKey = 'myLists';
  private categoryKey = 'categories';

  constructor() {}

  getLists(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addList(name: string): void {
    const currentList = this.getLists();
    currentList.push({ id: currentList.length + 1, name });
    localStorage.setItem(this.storageKey, JSON.stringify(currentList));
  }

  deleteList(id: string): void {
    const currentList = this.getLists();
    const index = currentList.findIndex(list => list.id === id);

    if (index !== -1) {
      currentList.splice(index, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(currentList));
    }
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

  // Gestionar Tareas en una Lista
  addTaskToList(listId: number, taskName: string, categoryId?: number): void {
    const currentLists = this.getLists();
    const list = currentLists.find(l => l.id === listId);
    if (list) {
      list.tasks.push({ id: Date.now(), name: taskName, categoryId });
      this.saveLists(currentLists);
    }
  }

  deleteTaskFromList(listId: number, taskId: number): void {
    const currentLists = this.getLists();
    const list = currentLists.find(l => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter((task: any) => task.id !== taskId);
      this.saveLists(currentLists);
    }
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
}
