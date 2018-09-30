import { Component, Inject  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-completion-dialog',
  templateUrl: './completion-dialog.component.html',
  styleUrls: ['./completion-dialog.component.css']
})
export class CompletionDialogComponent {
  time: number;
  difficulty: string;

  createForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private scoreService: ScoreService,
    private fb: FormBuilder,
    // private router: Router
  ) {
    this.time = data.time;
    this.difficulty = data.difficulty;

    this.createForm = this.fb.group({
      name: ['', Validators.required],
   });
  }

  createScore(name, difficulty, time) {
    this.scoreService.createScore(name, difficulty, time).subscribe(() => {
    });
  }
}