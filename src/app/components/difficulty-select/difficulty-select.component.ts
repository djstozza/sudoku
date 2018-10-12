import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Difficulty, difficulties } from '../../models/difficulty.model';

@Component({
  selector: 'app-difficulty-select',
  templateUrl: './difficulty-select.component.html',
  styleUrls: ['./difficulty-select.component.css']
})

export class DifficultySelectComponent {
  @Output() difficultySetter = new EventEmitter<Difficulty>();

  difficulty: Difficulty;
  difficulties = difficulties;

  setDifficulty() {
    this.difficultySetter.emit(this.difficulty);
  }
}
