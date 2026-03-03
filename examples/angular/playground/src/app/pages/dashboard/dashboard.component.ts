import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FyButtonComponent, FyLayoutComponent, FySlotComponent, FyNavLinkComponent, FyInputComponent, FyCardComponent, FyLibService, FySelectComponent, FyModalComponent, FyAccordionComponent, FyNotificationMenuComponent, FyNotificationService } from '@fylib/adapter-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FyButtonComponent, FyLayoutComponent, FySlotComponent, FyNavLinkComponent, FyInputComponent, FyCardComponent, FySelectComponent, FyModalComponent, FyAccordionComponent, FyNotificationMenuComponent],
  template: `
    <fy-layout>
      <fy-slot
        name="header"
        [headerLogoSvgSrc]="'/assets/finey_bw_nobg.svg'"
        [headerLogoBadgeText]="'BETA'"
        [headerLogoBadgeShine]="false"
        [headerLogoColorDark]="'white'"
        [headerLogoColorLight]="'black'"
        [copyrightText]="'Finey'">

        <nav fy-header-links-center class="actions">
          <fy-nav-link label="Home" to="/" iconName="house" [active]="true"></fy-nav-link>
          <fy-nav-link label="Segurança" to="/crypto-demo" iconName="shield-check"></fy-nav-link>
          <fy-nav-link label="Tabelas" to="/table-demo" iconName="table"></fy-nav-link>
          <fy-nav-link label="Gráficos" to="/chart-demo" iconName="chart-pie"></fy-nav-link>
        </nav>

        <nav fy-header-links-right class="actions" style="align-items: center;">
          <fy-notification-menu
            [notifications]="notifications"
            [unreadCount]="unreadCount"
            (fyClearAll)="onClearNotifications()"
            (fyViewAll)="onViewAllNotifications()"

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
            <fy-nav-link label="Home" to="/" iconName="house" [active]="true"></fy-nav-link>
            <fy-nav-link label="Segurança" to="/crypto-demo" iconName="shield-check"></fy-nav-link>
            <fy-nav-link label="Tabelas" to="/table-demo" iconName="table"></fy-nav-link>
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
        <div class="page-content">
          <h1>Dashboard (Full Layout)</h1>
          <p>Esta página utiliza o <code>app-layout</code> completo com Header, Sidebar e Content.</p>

          <fy-card
            title="Formulário de acesso rápido"
            mode="form"
            [scrollContent]="false"
            [mutedHeader]="true"
            [mutedFooter]="true"
            footerText="Campos obrigatórios marcados com *"
          >
            <fy-accordion
              [items]="accordionItems"
              [expandMode]="'multiple'"
              [bordered]="true"
              [lazy]="true"
              (fyChange)="onAccordionChange($event)"
            ></fy-accordion>

            <div>
              <fy-button
                label="Abrir modal"
                variant="primary"
                size="sm"
                (fyClick)="openDemoModal()"
              ></fy-button>
            </div>

            <div>
              <label for="demo-name">Nome completo</label>
              <fy-input
                id="demo-name"
                placeholder="Digite seu nome"
                size="md"
                status="default"
                iconLeftName="user"
              ></fy-input>
            </div>

            <div>
              <label for="demo-email">E-mail</label>
              <fy-input
                id="demo-email"
                placeholder="email@exemplo.com"
                type="email"
                size="md"
                status="success"
                iconLeftName="envelope"
              ></fy-input>
            </div>

            <div>
              <label for="demo-role">Função</label>
              <fy-select
                id="demo-role"
                [options]="selectOptions"
                [placeholder]="'Selecione sua função'"
                [iconRightName]="'caret-down'"
                [searchable]="true"
                [closeOnSelect]="true"
                (fyChange)="onRoleChange($event)"
              ></fy-select>
            </div>

            <div>
              <label for="demo-tags">Tags</label>
              <fy-select
                id="demo-tags"
                [options]="checkboxOptions"
                [placeholder]="'Selecione tags'"
                [showCheckbox]="true"
                [searchable]="true"
                [closeOnSelect]="false"
                (fyChange)="onTagsChange($event)"
              ></fy-select>
            </div>

            <div>
              <label for="demo-password">Senha</label>
              <fy-input
                id="demo-password"
                type="password"
                [showPasswordToggle]="true"
                placeholder="Mínimo 8 caracteres"
                size="md"
                status="error"
                iconLeftName="lock"
              ></fy-input>
            </div>

            <div fy-card-actions>
              <fy-button
                label="Testar Toast Sucesso"
                variant="ghost"
                size="sm"
                (fyClick)="testSuccessToast()"
              ></fy-button>
              <fy-button
                label="Testar Toast Erro"
                variant="ghost"
                size="sm"
                (fyClick)="testErrorToast()"
              ></fy-button>
              <fy-button
                label="Salvar alterações"
                variant="primary"
                size="md"
                [hoverAnimation]="'button-hover-glow'"
                [clickAnimation]="'button-click-press'"
                [clickEffect]="'confetti'"
              ></fy-button>
            </div>
          </fy-card>
          <fy-modal
            [visible]="demoModalOpen"
            [title]="'Exemplo de Modal'"
            [size]="'sm'"
            [showFooter]="true"
            [showConfirmButton]="true"
            [showCancelButton]="true"
            (fyClose)="demoModalOpen = false"
            (fyConfirm)="onModalConfirm()"
            (fyCancel)="onModalCancel()"
          >
            <p>Este é um conteúdo simples dentro do fy-modal.</p>
          </fy-modal>
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
    .page-content {
      display: flex;
      flex-direction: column;
      gap: var(--fy-spacing-lg, 24px);
      width: 100%;
      max-width: 960px;
      margin-left: auto;
      margin-right: auto;
      padding: var(--fy-spacing-lg, 24px);
    }
  `]
})
export class DashboardComponent {
  private fylib = inject(FyLibService);
  private notify = inject(FyNotificationService);

  notifications = [
    {
      id: '1',
      title: 'Nova mensagem',
      description: 'Você recebeu uma nova mensagem de Victor.',
      date: new Date(),
      read: false,
      details: 'A mensagem diz: "Olá, vamos testar o novo sistema de notificações do Workbench 3!"'
    },
    {
      id: '2',
      title: 'Atualização de Sistema',
      description: 'Uma nova versão do fyLib está disponível.',
      date: new Date(Date.now() - 3600000),
      read: false,
      details: 'Versão 2.0.4 traz melhorias no sistema de temas e novos componentes de Toast.'
    },
    {
      id: '3',
      title: 'Alerta de Segurança',
      description: 'Um novo acesso foi detectado em sua conta.',
      date: new Date(Date.now() - 86400000),
      read: true,
      details: 'Acesso realizado de um dispositivo desconhecido em São Paulo, SP.'
    }
  ];

  get unreadCount() {
    return this.notifications.filter(n => !n.read).length;
  }

  onClearNotifications() {
    this.notifications = [];
    this.notify.info('Todas as notificações foram limpas.');
  }

  onViewAllNotifications() {
    this.notify.info('Redirecionando para a página de notificações...');
  }

  testSuccessToast() {
    this.notify.success('Operação realizada com sucesso!', 'Sucesso');
  }

  testErrorToast() {
    this.notify.error('Ocorreu um erro ao processar sua solicitação.', 'Erro do Sistema');
  }

  demoModalOpen = false;
  accordionItems = [
    { id: 'acc-1', title: 'Seção 1', subtitle: 'Descrição da seção 1', content: 'Conteúdo da seção 1' },
    { id: 'acc-2', title: 'Seção 2', subtitle: 'Descrição da seção 2', content: 'Conteúdo da seção 2' },
    { id: 'acc-3', title: 'Seção 3', subtitle: 'Descrição da seção 3', content: 'Conteúdo da seção 3' },
  ];
  selectOptions = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Leitor', value: 'reader' }
  ];
  checkboxOptions = [
    { label: 'Financeiro', value: 'finance' },
    { label: 'Vendas', value: 'sales' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Operações', value: 'ops' }
  ];
  selectedRole?: string;
  selectedTags: string[] = [];
  toggleMode() {
    const current = this.fylib.getMode();
    this.fylib.setMode(current === 'light' ? 'dark' : 'light');
  }
  onRoleChange(v: string | string[]) {
    this.selectedRole = Array.isArray(v) ? v[0] : v;
  }
  onTagsChange(v: string | string[]) {
    this.selectedTags = Array.isArray(v) ? v : [v];
  }
  openDemoModal() {
    this.demoModalOpen = true;
  }
  onModalConfirm() {
    this.demoModalOpen = false;
  }
  onModalCancel() {
    this.demoModalOpen = false;
  }
  onAccordionChange(_v: any) {}
}
