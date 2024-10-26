import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomItemListComponent } from './custom-item-list/custom-item-list.component';
import { ModalActionComponent } from './create-modal/modal-action.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';

@NgModule({
  declarations: [CustomItemListComponent, ModalActionComponent, HeaderComponent, AddTaskComponent, CategoryManagerComponent],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [CustomItemListComponent, ModalActionComponent, HeaderComponent, AddTaskComponent, CategoryManagerComponent],
})
export class GenericComponentsModule {}
