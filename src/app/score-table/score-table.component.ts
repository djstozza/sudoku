import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ScoreService } from '../score.service';
import { Score } from '../score.model';
import { DifficultySelectComponent } from '../difficulty-select/difficulty-select.component';
import { Difficulty } from '../difficulty.model';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.scss']
})
export class ScoreTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(DifficultySelectComponent) difficultySetter: DifficultySelectComponent;

  dataSource = new MatTableDataSource<Score>();
  timeArr: Number[];

  private difficulty: Difficulty;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'name', 'difficulty', 'time'];

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreService.fetchScores().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Score>(data);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = ((data: Score, filter: string) => data.difficulty === filter);
        this.sortTimes();
      }
    );
  }

  onSetDifficulty(difficulty): void {
    this.difficulty = difficulty;
    this.applyFilter(this.difficulty.name);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue;
    this.sortTimes();
  }

  sortTimes(): void {
    this.timeArr = this.dataSource.filteredData.map(d => d.time).sort((a, b) => +a - +b);
  }
}
