import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyLayoutComponent, FySlotComponent } from '@fylib/adapter-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-only',
  standalone: true,
  imports: [CommonModule, FyLayoutComponent, FySlotComponent, RouterLink],
  template: `
    <fy-layout name="app-layout">
      <fy-slot name="header">
        <div fy-header-logo class="logo">Header Only Layout 🚀</div>
        <nav fy-header-links>
          <a routerLink="/" style="margin-right: 10px;">Voltar</a>
        </nav>
      </fy-slot>

      <fy-slot name="content">
        <div class="page-content">
          <h1>Layout: Apenas Header</h1>
          <p>Esta página demonstra o poder dos slots. O slot da <code>sidebar</code> não foi declarado, então o CSS Grid se ajusta para ocupar o espaço.</p>
        </div>
      </fy-slot>
    </fy-layout>
  `,
  styles: [`
    .logo { font-size: 20px; font-weight: bold; color: var(--fy-colors-primary); }
    .page-content { padding: 48px; text-align: center; }
  `]
})
export class HeaderOnlyComponent {}
