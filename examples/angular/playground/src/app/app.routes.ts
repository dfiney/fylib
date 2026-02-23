import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderOnlyComponent } from './pages/header-only/header-only.component';
import { SidebarOnlyComponent } from './pages/sidebar-only/sidebar-only.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'header-only', component: HeaderOnlyComponent },
  { path: 'sidebar-only', component: SidebarOnlyComponent },
  { path: '**', redirectTo: '' }
];
