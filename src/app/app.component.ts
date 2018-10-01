import { Component, HostListener } from '@angular/core';
import { SudokuService } from './sudoku.service';
import { Sudoku } from './sudoku/sudoku';
import { Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CompletionDialogComponent } from './completion-dialog/completion-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sudoku';
}
