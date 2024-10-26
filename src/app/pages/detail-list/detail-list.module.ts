import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailListPage } from './detail-list.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { DetailListPageRoutingModule } from './detail-list-routing.module';
import { GenericComponentsModule } from 'src/app/components/generic-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DetailListPageRoutingModule,
    GenericComponentsModule
  ],
  declarations: [DetailListPage]
})
export class DetailListPageModule {}