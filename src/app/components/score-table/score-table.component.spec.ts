
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
} from '@angular/material';


describe('ScoreTableComponent', () => {
  let component: ScoreTableComponent;
  let fixture: ComponentFixture<ScoreTableComponent>;

  beforeEach(fakeAsync(() => {
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
      ],
      providers: [
        DifficultySelectComponent,
        {
          provide: HttpXhrBackend,
          useClass: MockBackend
        }
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreTableComponent);
    component = fixture.componentInstance;
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
