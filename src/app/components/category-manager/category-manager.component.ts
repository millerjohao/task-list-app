import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { LogicCoreService } from 'src/app/services/logic-core.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
})
/**
 * Componente gestor de categorías
 */
export class CategoryManagerComponent implements OnInit {
  @Output() categoryCreated = new EventEmitter<void>();
  public logicCoreService = inject(LogicCoreService);
  public alertController = inject(AlertController);
  public newCategoryName: string = '';
  public categories: any[] = [];
  public tasks: any[] = [];

  constructor(private modalController: ModalController) {}

  /**
   * Pre-carga de categorías y tareas   
   */
  ngOnInit(): void {
    this.loadCategories();
    this.loadTasks();
  }

  /**
   * Método que realiza carga de tareas desde el localStorage   
   */
  loadTasks() {
    this.tasks = this.logicCoreService.getAllTasks();
  }

  /**
   * Método que realiza carga de categorías desde el localStorage   
   */
  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

  /**
   * Método que agrega una nueva categoría y actualiza la lista local
   */
  addCategory() {
    if (this.newCategoryName.trim()) {
      this.logicCoreService.addCategory(this.newCategoryName);
      this.newCategoryName = '';
      this.loadCategories();
      this.categoryCreated.emit();
    }
  }

  /**
   * Método que edita una categoría existente
   * @param categoryId id de la categoría
   * @param newName nuevo nombre de la categoría
   */   
  editCategory(categoryId: number, newName: string) {
    this.logicCoreService.editCategory(categoryId, newName);
    this.loadCategories();
  }

  /**
   * Método que elimina una categoría existente, y refresca la lista local
   * @param categoryId id de la categoría
   */   
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

  /**
   * Método que cierra el modal    
   */
  close() {
    this.modalController.dismiss(null, 'updated');
  }
}
