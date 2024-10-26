import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonList, ModalController } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { Observable } from 'rxjs';
import { ModalActionComponent } from 'src/app/components/create-modal/modal-action.component';
import { LogicCoreService } from '../../services/logic-core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-lists',
  templateUrl: 'my-lists.page.html',
  styleUrls: ['my-lists.page.scss'],
})
export class MyListsPage implements OnInit {
  @ViewChild(IonList) ionList!: IonList;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll!: IonInfiniteScroll;
  public modalController = inject(ModalController);
  public logicCoreService = inject(LogicCoreService);
  public router = inject(Router);
  public myLists: any[] = [];
  public title = 'Mis Listas';

  constructor() {
    /* this.myLists = aquiServiceData */
  }
  ngOnInit(): void {
    this.loadLists();
  }

  loadLists() {
    this.myLists = this.logicCoreService.getLists();
  }

  async openCreateModal(mode: any, inputData?: any) {
    const modal = await this.modalController.create({
      component: ModalActionComponent,
      componentProps: { mode, inputData },
      cssClass: 'custom-modal',
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.loadLists();
    }
  }

  reorderItems(event: CustomEvent) {
    const movedItem = this.myLists.splice(event.detail.from, 1)[0];
    this.myLists.splice(event.detail.to, 0, movedItem);
    this.logicCoreService.saveLists(this.myLists);
    event.detail.complete();
  }

  loadData() {
    if (this.myLists.length > 50) {
      this.ionInfiniteScroll.disabled = true;
      return;
    }
    setTimeout(() => {
      this.myLists.push(...this.myLists);
      this.ionInfiniteScroll.complete();
    }, 1500);
  }

  editListName(list: any) {
    this.openCreateModal('edit', list);
    this.ionList.closeSlidingItems();
  }
  deleteList(list: any) {
    this.logicCoreService.deleteList(list.id);
    this.ionList.closeSlidingItems();
    this.loadLists();
  }

  goToDetail(listId: any) {
    console.log(listId);    
    this.router.navigate(['/my-lists/detail-list', listId]);
  }
}
