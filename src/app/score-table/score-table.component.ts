import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ScoreService } from '../score.service';
import { Score } from '../score.model';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.css']
})
export class ScoreTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<Score>();
  timeArr: Number[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'name', 'difficulty', 'time'];

  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    this.scoreService.fetchScores().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<Score>(data);

        this.timeArr = data.map(d => d.time).sort((a, b) => +a - +b);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = ((data: Score, filter: string) => data.name === filter);
      }
    );
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }
}
