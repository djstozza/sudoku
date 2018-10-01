import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionDialogComponent } from './completion-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormatTimePipe } from '../format-time.pipe';
import { MatButtonModule, MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CompletionDialogComponent', () => {
  let component: CompletionDialogComponent;
  let fixture: ComponentFixture<CompletionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        HttpClient
      ],
      declarations: [CompletionDialogComponent, FormatTimePipe],
      imports: [
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
