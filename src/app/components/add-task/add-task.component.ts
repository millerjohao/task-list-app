import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogicCoreService } from 'src/app/services/logic-core.service';
import { CategoryManagerComponent } from '../category-manager/category-manager.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
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

  ngOnInit(): void {
    this.loadCategories();
    this.selectedCategoryId = this.predominantCategoryId;
  }

  loadCategories() {
    this.categories = this.logicCoreService.getCategories();
  }

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
