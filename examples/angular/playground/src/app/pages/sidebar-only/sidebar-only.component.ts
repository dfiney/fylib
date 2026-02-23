import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyLayoutComponent, FySlotComponent } from '@fylib/adapter-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-only',
  standalone: true,
  imports: [CommonModule, FyLayoutComponent, FySlotComponent, RouterLink],
  template: `
    <fy-layout name="app-layout">
      <fy-slot name="sidebar">
        <nav class="playground-nav">
          <div class="nav-brand" style="padding: 24px; font-weight: bold; color: var(--fy-colors-primary);">fyLib Sidebar</div>
          <ul>
            <li><a routerLink="/">Dashboard</a></li>
            <li class="active">Sidebar Only</li>
          </ul>
        </nav>
      </fy-slot>

      <fy-slot name="content">
        <div class="page-content">
          <h1>Layout: Apenas Sidebar</h1>
          <p>Nesta página, o slot <code>header</code> foi omitido. Útil para aplicações onde a navegação lateral é o foco principal.</p>
        </div>
      </fy-slot>
    </fy-layout>
  `,
  styles: [`
    .playground-nav { height: 100vh; }
    .playground-nav ul { list-style: none; padding: 0; }
    .playground-nav li { padding: 12px 24px; }
    .playground-nav li.active { background: rgba(var(--fy-colors-primary-rgb), 0.1); color: var(--fy-colors-primary); font-weight: bold; }
    .page-content { padding: 48px; }
    a { text-decoration: none; color: inherit; }
  `]
})
export class SidebarOnlyComponent {}
