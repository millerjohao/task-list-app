import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ModalActionComponent } from 'src/app/components/create-modal/modal-action.component';
import { LogicCoreService } from '../../services/logic-core.service';
import { Router } from '@angular/router';
import { RemoteConfigurationService } from 'src/app/services/remote-configuration.service';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

@Component({
  selector: 'app-my-lists',
  templateUrl: 'my-lists.page.html',
  styleUrls: ['my-lists.page.scss'],
})
/**
 * Página principal, página listas
 */
export class MyListsPage implements OnInit, AfterViewInit {
  @ViewChild(IonList) ionList!: IonList;
  public modalController = inject(ModalController);
  public logicCoreService = inject(LogicCoreService);
  public alertController = inject(AlertController);
  public router = inject(Router);
  public myLists: any[] = [];
  public title = 'Mis Listas';
  public isNewFeatureEnabled: boolean = false;
  public vibration = inject(Vibration);

  /**
   *
   * @param remoteConfigService Servicio de configuración para la funcionalidad de feature flag con remote config
   */
  constructor(private remoteConfigService: RemoteConfigurationService) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isNewFeatureEnabled = this.remoteConfigService.getFeatureFlag('new_feature_flag');
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

  /**
   * Método que reorganiza los elementos de la lista
   * @param event acción para reorganizar
   */

  reorderItems(event: CustomEvent) {
    const movedItem = this.myLists.splice(event.detail.from, 1)[0];
    this.myLists.splice(event.detail.to, 0, movedItem);
    this.logicCoreService.saveLists(this.myLists);
    event.detail.complete();
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
    this.vibration.vibrate(200);
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

  /**
   * Acceso hasta la ruta especial
   */
  goToSpecialPage() {
    this.router.navigate(['/my-lists/special-page']);
  }
}
