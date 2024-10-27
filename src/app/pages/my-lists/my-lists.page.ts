import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, IonList, ModalController } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { Observable } from 'rxjs';
import { ModalActionComponent } from 'src/app/components/create-modal/modal-action.component';
import { LogicCoreService } from '../../services/logic-core.service';
import { Router } from '@angular/router';
import { RemoteConfigurationService } from 'src/app/services/remote-configuration.service';

@Component({
  selector: 'app-my-lists',
  templateUrl: 'my-lists.page.html',
  styleUrls: ['my-lists.page.scss'],
})
export class MyListsPage implements OnInit, AfterViewInit {
  @ViewChild(IonList) ionList!: IonList;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll!: IonInfiniteScroll;
  public modalController = inject(ModalController);
  public logicCoreService = inject(LogicCoreService);
  public alertController = inject(AlertController);
  public router = inject(Router);
  public myLists: any[] = [];
  public title = 'Mis Listas';
  public isNewFeatureEnabled: boolean = false;

  /**
   *
   * @param remoteConfigService Servicio de configuración para la funcionalidad de feature flag con remote config
   */
  constructor(private remoteConfigService: RemoteConfigurationService) {}
  ngAfterViewInit(): void {
    setTimeout(() => {      
      this.isNewFeatureEnabled = this.remoteConfigService.getFeatureFlag('new_feature_enabled');
    }, 1000);
  }
  ngOnInit(): void {
    this.loadLists();
  }

  /**
   * Método para cargar las listas almacenadas en el localstorage
   */
  loadLists() {
    this.myLists = this.logicCoreService.getLists();
  }

  /**
   *
   * @param mode create/edit para cambiar el modo a creación o edición de una lista
   * @param inputData objeto para envío de data
   */
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

  /**
   * Método que edita una lista
   * @param list objeto a editar
   */
  editListName(list: any) {
    this.openCreateModal('edit', list);
    this.ionList.closeSlidingItems();
  }

  /**
   * Método que elimina una lista, realiza validación antes de eliminar con tareas
   * @param list objeto a eliminar
   */
  async deleteList(list: any) {
    const hasTasks = this.logicCoreService.hasTasks(list.id);

    if (hasTasks) {
      const alert = await this.alertController.create({
        header: 'Confirmar acción',
        message: 'Esta lista tiene tareas. ¿Quieres eliminarla junto con todas las tareas asociadas?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {},
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.logicCoreService.deleteListWithTasks(list.id);
              this.loadLists();
            },
          },
        ],
      });

      await alert.present();
    } else {
      this.logicCoreService.deleteList(list.id);
      this.ionList.closeSlidingItems();
      this.loadLists();
    }
  }

  /**
   * Método para navegar a la vista de detalle de una lista
   * @param listId id de la lista
   */
  goToDetail(listId: any) {
    this.router.navigate(['/my-lists/detail-list', listId]);
  }

  goToSpecialPage() {
    this.router.navigate(['/my-lists/special-page']);
  }
}
