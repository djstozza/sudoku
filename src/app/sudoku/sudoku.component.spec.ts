import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { SudokuComponent } from './sudoku.component';
import { CellComponent } from '../cell/cell.component';
import { FormatTimePipe } from '../format-time.pipe';
import { SudokuService } from '../sudoku.service';
import { MatButtonModule, MatIconModule } from '@angular/material';


describe('SudokuComponent', () => {
  let component: SudokuComponent;
  let fixture: ComponentFixture<SudokuComponent>;
  let compiled: any = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SudokuComponent,
        CellComponent,
      ],
      imports: [
        MatButtonModule,
        MatIconModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const app = new AppComponent(new SudokuService());
    app.setDifficulty('insane');
    fixture = TestBed.createComponent(SudokuComponent);
    component = fixture.componentInstance;
    component.sudoku = app.sudoku;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should render number buttons', () => {
    const buttons = compiled.querySelectorAll('.controls button');
    const numberButtons = component.numberButtons;

    for (let index in numberButtons) {
      expect(buttons[index].textContent).toContain(`${numberButtons[index].number}`);
    }
  });

  it('active cell', () => {
    const cells = compiled.querySelectorAll('.cell');
    const index = Math.floor(Math.random() * cells.length);
    const sudokuArr = JSON.parse(JSON.stringify(component.sudoku)).flat();
    cells[index].click();
    fixture.detectChanges();
    expect(component.activeField).toEqual(sudokuArr[index]);
  });

  it('insert number', () => {
    const cell = compiled.querySelector('.cell:not(.readonly)');
    cell.click();
    fixture.detectChanges();

    const buttons = compiled.querySelectorAll('.controls button');
    const index = Math.floor(Math.random() * buttons.length);
    const button = buttons[index];
    button.click();
    fixture.detectChanges();

    expect(cell.textContent).toEqual(button.textContent.trim());
    expect(component.activeField.value).toEqual(parseInt(button.textContent));
  });
});
