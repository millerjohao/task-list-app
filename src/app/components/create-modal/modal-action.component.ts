import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LogicCoreService } from '../../services/logic-core.service';

@Component({
  selector: 'app-modal-action',
  templateUrl: './modal-action.component.html',
  styleUrls: ['./modal-action.component.scss'],
})
export class ModalActionComponent implements OnInit {
  @Input() mode: any;
  @Input() inputData: any;
  public titleText!: string;
  public btnText!: string;
  public itemName: string = '';
  public modalController = inject(ModalController);
  public logicCoreService = inject(LogicCoreService);

  constructor() {}

  ngOnInit(): void {
    this.titleText = this.mode === 'create' ? 'Nueva lista' : 'Editar lista';
    this.btnText = this.mode === 'create' ? 'Crear' : 'Guardar';        
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  action() {
    if (this.itemName.trim()) {
      if(this.mode === 'create'){
        this.logicCoreService.addList(this.itemName);        
      } else {         
        this.logicCoreService.editList(this.inputData.id, this.itemName);
      }
      this.modalController.dismiss(this.itemName, 'confirm');
    }
  }
}
