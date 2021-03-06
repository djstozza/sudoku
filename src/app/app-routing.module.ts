import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { ScoreTableComponent } from './components/score-table/score-table.component';

const routes: Routes = [
  {
    path: '', component: GameComponent
  },
  {
    path: 'scores', component: ScoreTableComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
