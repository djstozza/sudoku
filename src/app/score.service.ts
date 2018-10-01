import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  fetchScores() {
    return this.http.get('/api/scores');
  }
}
