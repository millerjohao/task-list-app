import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  /**
   * Variable nombre por parámetro de entrada
   */
  @Input() name?: string;

}
