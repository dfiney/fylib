import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FyTableComponent,
  FyLayoutComponent,
  FySlotComponent,
  FyButtonComponent,
  FyNavLinkComponent,
  FyNotificationMenuComponent,
  FyNotificationService,
  FyLibService
} from '@fylib/adapter-angular';
import { TableColumn, TableAction } from '@fylib/catalog';

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    CommonModule,
    FyTableComponent,
    FyLayoutComponent,
    FySlotComponent,
    FyButtonComponent,
    FyNavLinkComponent,
    FyNotificationMenuComponent
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
          <fy-nav-link label="Tabelas" to="/table-demo" iconName="table" [active]="true"></fy-nav-link>
          <fy-nav-link label="Gráficos" to="/chart-demo" iconName="chart-pie"></fy-nav-link>
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
            <fy-nav-link label="Tabelas" to="/table-demo" iconName="table" [active]="true"></fy-nav-link>
            <fy-nav-link label="Gráficos" to="/chart-demo" iconName="chart-pie"></fy-nav-link>
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
            <h1>Componente Table</h1>
            <p>Demonstração da <code>fy-table</code> com filtros, paginação e ações customizadas.</p>
          </header>

          <div class="demo-section">
            <fy-table
              title="Gestão de Usuários"
              subtitle="Lista completa de colaboradores ativos no sistema"
              [data]="users"
              [columns]="columns"
              [actions]="tableActions"
              [showSearch]="true"
              [searchTargets]="['name', 'email', 'role']"
              [showPagination]="true"
              [totalItems]="users.length"
              [pageSize]="5"
              [currentPage]="1"
              variant="default"
              [rowClickable]="true"
              (fySearch)="onSearch($event)"
              (fyRowClick)="onRowClick($event)"
            >
              <div fy-table-tools>
                <fy-button label="Exportar CSV" variant="secondary" size="sm" iconName="download"></fy-button>
                <fy-button label="Novo Usuário" variant="primary" size="sm" iconName="plus"></fy-button>
              </div>
            </fy-table>
          </div>

          <div class="demo-section">
             <header class="section-header">
                <h3>Variante Striped & Compact</h3>
             </header>
             <fy-table
              [data]="smallData"
              [columns]="columns.slice(0, 3)"
              variant="striped"
              size="compact"
              [showHeader]="false"
            ></fy-table>
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

    .logo { font-weight: bold; font-size: 1.2rem; color: var(--fy-colors-primary); }
    .actions { display: flex; gap: 8px; }

    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-header h3 { margin: 0; }
  `]
})
export class TableDemoComponent {
  private fylib = inject(FyLibService);
  private notify = inject(FyNotificationService);

  notifications = [
    {
      id: '1',
      title: 'Tabelas Prontas',
      description: 'O novo sistema de tabelas foi carregado com sucesso.',
      date: new Date(),
      read: false
    }
  ];

  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '80px', sortable: true },
    { key: 'name', label: 'Nome', sortable: true, iconName: 'user' },
    { key: 'email', label: 'E-mail', sortable: true, iconName: 'envelope' },
    { key: 'role', label: 'Cargo', align: 'center' },
    { key: 'status', label: 'Status', align: 'right' }
  ];

  users = [
    { id: 1, name: 'Victor Lima', email: 'victor@finey.com', role: 'CTO', status: 'Ativo' },
    { id: 2, name: 'Alice Silva', email: 'alice@example.com', role: 'Designer', status: 'Ativo' },
    { id: 3, name: 'Bruno Santos', email: 'bruno@dev.io', role: 'DevOps', status: 'Inativo' },
    { id: 4, name: 'Carla Dias', email: 'carla@marketing.com', role: 'Manager', status: 'Ativo' },
    { id: 5, name: 'Daniel Oliveira', email: 'daniel@support.io', role: 'Support', status: 'Ativo' },
    { id: 6, name: 'Eduarda Rocha', email: 'eduarda@sales.com', role: 'Sales', status: 'Ativo' },
    { id: 7, name: 'Fabio Junior', email: 'fabio@dev.io', role: 'DevOps', status: 'Inativo' },
    { id: 8, name: 'Gabriela Lima', email: 'gabriela@design.com', role: 'Designer', status: 'Ativo' },
    { id: 9, name: 'Hugo Souza', email: 'hugo@support.io', role: 'Support', status: 'Ativo' },
    { id: 10, name: 'Isabela Costa', email: 'isabela@marketing.com', role: 'Manager', status: 'Ativo' },
  ];

  smallData = this.users.slice(0, 3);

  tableActions: TableAction[] = [
    {
      id: 'edit',
      iconName: 'pencil',
      onClick: (row) => console.log('Edit', row)
    },
    {
      id: 'delete',
      iconName: 'trash',
      variant: 'danger',
      onClick: (row) => console.log('Delete', row)
    }
  ];

   toggleMode() {
    const current = this.fylib.getMode();
    this.fylib.setMode(current === 'light' ? 'dark' : 'light');
  }

  onSearch(term: string) {
    console.log('Search term:', term);
  }

  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  onPageChange(page: number) {
    console.log('Page changed to:', page);
  }
}
