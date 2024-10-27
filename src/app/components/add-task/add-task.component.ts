import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogicCoreService } from 'src/app/services/logic-core.service';
import { CategoryManagerComponent } from '../category-manager/category-manager.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
/**
 * Componente para agregar una nueva tarea
 */
export class AddTaskComponent implements OnInit {
  @Input() predominantCategoryId!: any;
  @Output() taskAdded = new EventEmitter<any>();
  @Output() categoryUpdated = new EventEmitter<void>();
  public taskName: string = '';
  public selectedCategoryId: number | null = null;
  public categories: any[] = [];
  public logicCoreService = inject(LogicCoreService);
  public modalController = inject(ModalController);

  constructor() {}

  /**
   * Pre-carga de categorías, y id categoría
   */
  ngOnInit(): void {
    this.loadCategories();
    this.selectedCategoryId = this.predominantCategoryId;
  }

  /**
   * Método que realiza carga de categorías desde el localStorage
   */
  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

  /**
   * Método que abre el modal de gestor de categorías, componente que crea, edita y borra categorías
   */
  async openCategoryManager() {
    const modal = await this.modalController.create({
      component: CategoryManagerComponent,
      cssClass: 'custom-modal',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'updated') {
      this.loadCategories();
      this.categoryUpdated.emit();
    }
  }

  /**
 * Método que agrega una nueva tarea  
 */
  onAddTask() {
    if (this.taskName.trim() && this.selectedCategoryId) {
      this.taskAdded.emit({
        name: this.taskName,
        categoryId: this.selectedCategoryId,
      });
      this.taskName = '';
    }
  }
}
