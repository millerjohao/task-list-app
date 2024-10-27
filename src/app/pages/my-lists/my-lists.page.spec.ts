import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyListsPage } from './my-lists.page';

describe('MyListsPage', () => {
  let component: MyListsPage;
  let fixture: ComponentFixture<MyListsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyListsPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MyListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
