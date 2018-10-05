import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Difficulty } from '../difficulty.model';

@Component({
  selector: 'app-difficulty-select',
  templateUrl: './difficulty-select.component.html',
  styleUrls: ['./difficulty-select.component.css']
})

export class DifficultySelectComponent {
  @Output() difficultySetter = new EventEmitter<Difficulty>();

  difficulty: Difficulty;

  difficulties: Difficulty[] = [
    { name: 'easy', value: 46 },
    { name: 'moderate', value: 36 },
    { name: 'hard', value: 29 },
    { name: 'expert', value: 23 },
    { name: 'insane', value: 17 }
  ]

  setDifficulty(difficulty) {
    this.difficulty = difficulty;

    this.difficultySetter.emit(this.difficulty);
  }
}
