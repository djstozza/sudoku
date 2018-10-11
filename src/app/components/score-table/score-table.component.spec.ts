
import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';

import { ScoreTableComponent } from './score-table.component';
import { DifficultySelectComponent } from '../difficulty-select/difficulty-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatOptionModule,
  MatSelectModule,
  MatTableDataSource
} from '@angular/material';
import { Score } from '../../models/score.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ScoreTableComponent', () => {
  let component: ScoreTableComponent;
  let fixture: ComponentFixture<ScoreTableComponent>;
  let scores: Score[] = [
    { id: '1', name: 'foo', difficulty: 'easy', time: 1 },
    { id: '2', name: 'bar', difficulty: 'easy', time: 2 }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ScoreTableComponent,
        DifficultySelectComponent,
        FormatTimePipe
      ],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatOptionModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        DifficultySelectComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTableComponent);
    component = fixture.componentInstance;
    component.dataSource = new MatTableDataSource<Score>(scores);
    component.sortTimes();
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
