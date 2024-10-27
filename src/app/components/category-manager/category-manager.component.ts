import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LogicCoreService } from 'src/app/services/logic-core.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
})
export class CategoryManagerComponent implements OnInit {
  @Output() categoryCreated = new EventEmitter<void>();
  public logicCoreService = inject(LogicCoreService);
  public alertController = inject(AlertController);
  public newCategoryName: string = '';
  public categories: any[] = [];
  public tasks: any[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.logicCoreService.getAllTasks();
  }

  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      this.logicCoreService.addCategory(this.newCategoryName);
      this.newCategoryName = '';
      this.loadCategories();
      this.categoryCreated.emit();
    }
  }

  editCategory(categoryId: number, newName: string) {
    this.logicCoreService.editCategory(categoryId, newName);
    this.loadCategories();
  }

  async deleteCategory(categoryId: number) {
    const isCategoryUsed = this.tasks.some(task => task.categoryId === categoryId);

    if (isCategoryUsed) {
      const alert = await this.alertController.create({
        header: 'Acción imposible',
        message: 'No se puede eliminar esta categoría porque está asociada a una o más tareas.',
        buttons: [],
      });

      await alert.present();
    } else {
      this.logicCoreService.deleteCategory(categoryId);
    }

    this.loadCategories();
  }

  close() {
    this.modalController.dismiss(null, 'updated');
  }
}
