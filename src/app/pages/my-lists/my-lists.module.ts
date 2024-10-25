import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyListsPage } from './my-lists.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './my-lists-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [MyListsPage],
  exports: [MyListsPage],
})
export class MyListsPageModule {}
