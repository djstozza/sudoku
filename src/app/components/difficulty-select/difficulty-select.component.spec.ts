import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DifficultySelectComponent } from './difficulty-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DifficultySelectComponent', () => {
  let component: DifficultySelectComponent;
  let fixture: ComponentFixture<DifficultySelectComponent>;
  let compiled: any = null;
  let difficultySelectForm: any = null;
  let difficultySelect: any = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DifficultySelectComponent],
      imports: [
        BrowserAnimationsModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySelectComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    difficultySelect = compiled.querySelector('.mat-select');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the difficulty when difficulty setter is called', () => {
    spyOn(component.difficultySetter, 'emit').and.stub();
    const difficulty =  { name: 'easy', value: 46 }
    component.difficulty = difficulty;

    component.setDifficulty();

    expect(component.difficultySetter.emit).toHaveBeenCalledWith(difficulty);
  });
});
