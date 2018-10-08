import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DifficultySelectComponent } from './difficulty-select.component';

describe('DifficultySelectComponent', () => {
  let component: DifficultySelectComponent;
  let fixture: ComponentFixture<DifficultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DifficultySelectComponent],
      imports: [
        BrowserAnimationsModule,
        MatOptionModule,
        MatSelectModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
