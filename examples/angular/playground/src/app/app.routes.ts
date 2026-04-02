import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TableDemoComponent } from './pages/table-demo/table-demo.component';
import { ChartDemoComponent } from './pages/chart-demo/chart-demo.component';
import { CryptoDemoComponent } from './pages/crypto-demo/crypto-demo.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'table-demo', component: TableDemoComponent },
  { path: 'chart-demo', component: ChartDemoComponent },
  { path: 'crypto-demo', component: CryptoDemoComponent },
  { path: '**', redirectTo: '' }
];
