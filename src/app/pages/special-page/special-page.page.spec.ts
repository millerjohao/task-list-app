import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialPage } from './special-page.page';

describe('SpecialPage', () => {
  let component: SpecialPage;
  let fixture: ComponentFixture<SpecialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
