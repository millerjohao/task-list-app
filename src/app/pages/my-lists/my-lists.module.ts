import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyListsPage } from './my-lists.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MyListsPageRoutingModule } from './my-lists-routing.module';
import { GenericComponentsModule } from 'src/app/components/generic-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MyListsPageRoutingModule,
    GenericComponentsModule,
  ],
  declarations: [MyListsPage],
  exports: [MyListsPage],
})
export class MyListsPageModule {}
