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
  let sudokuArr: any = null;
  let cells: any = null;
  let buttons: any = null;
  let button: any = null;

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

    sudokuArr = JSON.parse(JSON.stringify(component.sudoku)).flat();
    cells = compiled.querySelectorAll('.cell');
    buttons = compiled.querySelectorAll('.controls button');

    button = buttons[Math.floor(Math.random() * buttons.length)];
  });

  it('should render number buttons', () => {
    const numberButtons = component.numberButtons;

    for (let index in numberButtons) {
      expect(buttons[index].textContent).toContain(`${numberButtons[index].number}`);
    }
  });

  it('active cell', () => {
    const index = Math.floor(Math.random() * cells.length);

    cells[index].click();
    fixture.detectChanges();
    expect(component.activeField).toEqual(sudokuArr[index]);
  });

  it('insert number', () => {
    const cell = compiled.querySelector('.cell:not(.readonly)');
    cell.click();
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(cell.textContent).toEqual(button.textContent.trim());
    expect(component.activeField.value).toEqual(parseInt(button.textContent));
  });

  it('note mode', () => {
    compiled.querySelector('.notes').click();
    fixture.detectChanges();

    expect(component.noteMode).toBeTruthy();

    const input = sudokuArr.find((f) => (!f.readonly));
    const index = sudokuArr.indexOf(input);
    const cell = compiled.querySelectorAll('.cell')[index];

    cell.click();

    button.click();
    fixture.detectChanges();

    expect(component.activeField.notes[0]).toEqual(parseInt(button.textContent));
    expect(compiled.querySelector('.note').classList.contains(`note-${button.textContent.trim()}`)).toBeTruthy();
  });

  it('check numbers', () => {
    const buttonNumber = parseInt(button.textContent);

    for (let rowIndex in component.sudoku) {
      for (let colIndex in component.sudoku[rowIndex]) {
        const index = parseInt(rowIndex) * component.sudoku.length + parseInt(colIndex);
        const input = component.sudoku[rowIndex][colIndex]

        if (input.answer === buttonNumber && !input.readonly) {
          cells[index].click();
          button.click();
        }
      }
    }
    fixture.detectChanges();

    expect(component.numberButtons.find(f => (f.number === buttonNumber)).disabled).toBeTruthy();
    expect(button.disabled).toBeTruthy();
  });
});
