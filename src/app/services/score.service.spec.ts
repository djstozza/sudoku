import { TestBed, inject } from '@angular/core/testing';

import { ScoreService } from './score.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ScoreService, HttpClientModule]
    });
  });

  it('should be created', inject([ScoreService], (service: ScoreService) => {
    expect(service).toBeTruthy();
  }));
});
