
import { fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { ScoreService } from '../../services/score.service';
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
import { Observable, of } from 'rxjs';

const scores: Score[] = [
  { id: '1', name: 'name1', difficulty: 'easy', time: 2 },
  { id: '2', name: 'name2', difficulty: 'easy', time: 1 },
  { id: '3', name: 'name3', difficulty: 'moderate', time: 6 },
  { id: '4', name: 'name4', difficulty: 'hard', time: 7 },
  { id: '5', name: 'name5', difficulty: 'moderate', time: 8 },
  { id: '6', name: 'name1', difficulty: 'very hard', time: 8 },
]

class MockScoreService {
  fetchScores(): Observable<Score[]> {
    return of(scores);
  }
}

describe('ScoreTableComponent', () => {
  let component: ScoreTableComponent;
  let fixture: ComponentFixture<ScoreTableComponent>;
  let scoreService: any = null;

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
        DifficultySelectComponent,
        { provide: ScoreService, useClass: MockScoreService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTableComponent);
    scoreService = TestBed.get(ScoreService);
    spyOn(scoreService, 'fetchScores').and.returnValue(of(scores));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should should fetch all the scores and sort the score times in ascending order', () => {
    expect(component.dataSource.filteredData).toEqual(scores);
    expect(component.timeArr).toEqual([1, 2, 6, 7, 8, 8]);
  });

  it('should filter the scores based on difficulty', () => {
    component.applyFilter('easy');
    fixture.detectChanges();
    expect(component.dataSource.filteredData).toEqual(scores.filter(score => score.difficulty === 'easy'));
    expect(component.timeArr).toEqual([1, 2]);
  });
});
