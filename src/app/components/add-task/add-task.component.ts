import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogicCoreService } from 'src/app/services/logic-core.service';
import { CategoryManagerComponent } from '../category-manager/category-manager.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public taskName: string = '';
  public selectedCategoryId: number | null = null;
  public categories: any[] = [];
  public logicCoreService = inject(LogicCoreService);
  public modalController = inject(ModalController);

  @Output() taskAdded = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.loadCategories();
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
    }
  }

  onAddTask() {
    if (this.taskName.trim() && this.selectedCategoryId) {
      this.taskAdded.emit(this.taskName);
      this.taskName = '';
      this.selectedCategoryId = null;
    }
  }
}
