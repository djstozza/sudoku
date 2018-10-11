import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  createScore(name, difficulty, time) {
    const score = {
      name: name,
      difficulty: difficulty,
      time: time,
    };

    return this.http.post('/api/scores', score);
  }

  fetchScores(): Observable<Score[]> {
    return this.http.get<Score[]>('/api/scores');
  }
}
