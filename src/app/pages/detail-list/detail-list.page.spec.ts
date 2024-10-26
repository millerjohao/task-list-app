import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { DetailListPage } from './detail-list.page';

describe('DetailListPage', () => {
  let component: DetailListPage;
  let fixture: ComponentFixture<DetailListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailListPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
