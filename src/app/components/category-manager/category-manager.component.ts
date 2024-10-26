import { Component, inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogicCoreService } from 'src/app/services/logic-core.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
})
export class CategoryManagerComponent  implements OnInit {

  public newCategoryName: string = '';
  public categories: any[] = [];
  public logicCoreService = inject(LogicCoreService);

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.logicCoreService.addCategory(this.newCategoryName);
      this.newCategoryName = '';
      this.loadCategories();
    }
  }

  editCategory(categoryId: number, newName: string) {
    this.logicCoreService.editCategory(categoryId, newName);
    this.loadCategories();
  }

  deleteCategory(categoryId: number) {
    this.logicCoreService.deleteCategory(categoryId);
    this.loadCategories();
  }

  close() {
    this.modalController.dismiss(null, 'updated');
  }
}
