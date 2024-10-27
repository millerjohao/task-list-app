import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialPage } from './special-page.page';

import { SpecialPageRoutingModule } from './special-page-routing.module';
import { GenericComponentsModule } from 'src/app/components/generic-components.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SpecialPageRoutingModule, GenericComponentsModule],
  declarations: [SpecialPage],
})
export class SpecialPageModule {}
