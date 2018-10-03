import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ScoreTableDataSource } from './score-table-datasource';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ScoreTableDataSource;
  timeArr: Number[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'name', 'difficulty', 'time'];

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.fetchScores().subscribe(
      (data) => {
        this.dataSource = new ScoreTableDataSource(data, this.paginator, this.sort);
        this.timeArr = data.map(d => d.time).sort((a, b) => this.compare(a, b));
      }
    );
  }

  private compare(a, b): number {
    return a - b
  }
}
