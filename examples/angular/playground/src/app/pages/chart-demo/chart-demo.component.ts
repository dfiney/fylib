import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FyChartComponent,
  FyLayoutComponent,
  FySlotComponent,
  FyButtonComponent,
  FyNavLinkComponent,
  FyNotificationMenuComponent,
  FyNotificationService,
  FyCardComponent,
  FyLibService
} from '@fylib/adapter-angular';
import { ChartSeries } from '@fylib/catalog';

@Component({
  selector: 'app-chart-demo',
  standalone: true,
  imports: [
    CommonModule,
    FyChartComponent,
    FyLayoutComponent,
    FySlotComponent,
    FyButtonComponent,
    FyNavLinkComponent,
    FyNotificationMenuComponent,
    FyCardComponent
  ],
  template: `
    <fy-layout name="app-layout">
      <fy-slot
        name="header"
        [headerLogoSvgSrc]="'/assets/finey_bw_nobg.svg'"
        [headerLogoBadgeText]="'BETA'"
        [headerLogoBadgeShine]="false"
        [headerLogoColorDark]="'white'"
        [headerLogoColorLight]="'black'"
        [copyrightText]="'Finey'">

        <nav fy-header-links-center class="actions">
          <fy-nav-link label="Home" to="/" iconName="house"></fy-nav-link>
          <fy-nav-link label="Segurança" to="/crypto-demo" iconName="shield-check"></fy-nav-link>
          <fy-nav-link label="Tabelas" to="/table-demo" iconName="table"></fy-nav-link>
          <fy-nav-link label="Gráficos" to="/chart-demo" iconName="chart-pie" [active]="true"></fy-nav-link>
        </nav>

        <nav fy-header-links-right class="actions" style="align-items: center;">
          <fy-notification-menu
            [notifications]="notifications"
            [unreadCount]="unreadCount"
          ></fy-notification-menu>

          <fy-button
            size="sm"
            variant="ghost"
            iconName="moon"
            (click)="toggleMode()"
            label="Alternar modo">
          </fy-button>
        </nav>
      </fy-slot>

      <fy-slot
        name="sidebar"
        [fixedSidebar]="true"
        [activeAnimations]="true"
        [activeEffects]="true"
        [copyrightText]="'Finey'">
        <div fy-sidebar-logo class="profile">
          <img class="avatar" src="assets/me.png" alt="Avatar">
          <div class="profile-info">
            <p class="name">Victor</p>
            <p class="role">CEO</p>
          </div>
        </div>
        <nav fy-sidebar-links>
          <div>
            <fy-nav-link label="Home" to="/" iconName="house"></fy-nav-link>
            <fy-nav-link label="Segurança" to="/crypto-demo" iconName="shield-check"></fy-nav-link>
            <fy-nav-link label="Tabelas" to="/table-demo" iconName="table"></fy-nav-link>
            <fy-nav-link label="Gráficos" to="/chart-demo" iconName="chart-pie" [active]="true"></fy-nav-link>
          </div>
        </nav>

        <div fy-sidebar-footer>
          <fy-button
            [hoverAnimation]="'button-hover-glow'"
            [clickAnimation]="'button-click-press'"
            label="Sair da conta"
            iconName="sign-out"
            variant="ghost"></fy-button>
        </div>
      </fy-slot>

      <fy-slot name="content">
        <div class="page-container">
          <header class="page-header">
            <h1>Componente Chart</h1>
            <p>Gráficos modernos, interativos e integrados ao sistema de temas do fyLib.</p>
          </header>

          <div class="charts-grid">
            <fy-card title="Vendas Mensais" subtitle="Comparativo de vendas por categoria">
              <fy-chart
                type="area"
                [series]="salesSeries"
                [categories]="months"
                [colors]="['#3b82f6', '#10b981']"
                height="350"
                (fyDataClick)="onChartClick($event)"
              ></fy-chart>
            </fy-card>

            <fy-card title="Distribuição de Tráfego" subtitle="Origem dos usuários este mês">
              <fy-chart
                type="donut"
                [series]="trafficSeries"
                [categories]="trafficLabels"
                height="350"
                (fyDataClick)="onChartClick($event)"
              ></fy-chart>
            </fy-card>

            <fy-card title="Performance de Equipe" subtitle="Métricas de produtividade trimestral" style="grid-column: span 2">
              <fy-chart
                type="bar"
                [series]="performanceSeries"
                [categories]="teams"
                [stacked]="true"
                height="350"
              ></fy-chart>
            </fy-card>
          </div>
        </div>
      </fy-slot>
    </fy-layout>
  `,
  styles: [`
    .profile {
      display: flex;
      align-items: center;
      gap: var(--fy-spacing-md, 16px);
    }
    .profile .avatar {
      width: 40px;
      height: 40px;
      border-radius: var(--fy-borderRadius-full, 9999px);
      object-fit: cover;
      box-shadow: 0 0 0 1px var(--fy-colors-border, rgba(255,255,255,0.08));
    }
    .profile .profile-info .name {
      font-weight: var(--fy-typography-fontWeight-bold, 700);
    }
    .profile .profile-info .role {
      font-size: var(--fy-typography-fontSize-sm, 12px);

      opacity: 0.9;
    }

    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .charts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    @media (max-width: 992px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
      .charts-grid fy-card {
        grid-column: span 1 !important;
      }
    }

    .actions { display: flex; gap: 8px; }
  `]
})
export class ChartDemoComponent {
  private fylib = inject(FyLibService);
  private notify = inject(FyNotificationService);

  notifications = [
    {
      id: '1',
      title: 'Gráficos Carregados',
      description: 'O sistema de visualização de dados está pronto.',
      date: new Date(),
      read: false
    }
  ];

  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  salesSeries: ChartSeries[] = [
    { name: 'Produtos', data: [31, 40, 28, 51, 42, 109] },
    { name: 'Serviços', data: [11, 32, 45, 32, 34, 52] }
  ];

  trafficLabels = ['Direto', 'Social', 'Busca', 'Referência'];
  trafficSeries: ChartSeries[] = [
    { name: 'Tráfego', data: [44, 55, 13, 33] }
  ];

  teams = ['Design', 'Dev', 'Marketing', 'Vendas', 'RH', 'Suporte'];
  performanceSeries: ChartSeries[] = [
    { name: 'Q1', data: [44, 55, 41, 67, 22, 43] },
    { name: 'Q2', data: [13, 23, 20, 8, 13, 27] },
    { name: 'Q3', data: [11, 17, 15, 15, 21, 14] }
  ];

  toggleMode() {
    const current = this.fylib.getMode();
    this.fylib.setMode(current === 'light' ? 'dark' : 'light');
  }

  onChartClick(event: any) {
    console.log('Chart data point clicked:', event);
  }
}
