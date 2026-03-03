import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FyButtonComponent,
  FyLayoutComponent,
  FySlotComponent,
  FyNavLinkComponent,
  FyCardComponent,
  FyLibService,
  FyNotificationMenuComponent,
  FyNotificationService,
  FyWebClientService,
  FyInputComponent,
  FySelectComponent
} from '@fylib/adapter-angular';
import { cryptoEngine } from '@fylib/crypto';
import { cryptoConfig } from '../../../fylib/crypto.config';

@Component({
  selector: 'app-crypto-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FyButtonComponent,
    FyLayoutComponent,
    FySlotComponent,
    FyNavLinkComponent,
    FyCardComponent,
    FyNotificationMenuComponent,
    FyInputComponent,
    FySelectComponent
  ],
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
          <fy-nav-link label="Home" to="/" iconName="house"></fy-nav-link>
          <fy-nav-link label="Segurança" to="/crypto-demo" iconName="shield-check" [active]="true"></fy-nav-link>
          <fy-nav-link label="Tabelas" to="/table-demo" iconName="table"></fy-nav-link>
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
            <fy-nav-link label="Segurança" to="/crypto-demo" iconName="shield-check" [active]="true"></fy-nav-link>
            <fy-nav-link label="Tabelas" to="/table-demo" iconName="table"></fy-nav-link>
            <fy-nav-link label="Gráficos" to="/chart-demo" iconName="chart-pie"></fy-nav-link>
          </div>
        </nav>
      </fy-slot>

      <fy-slot name="content">
        <div class="page-content">
          <div class="header-section">
            <h1>Segurança de Dados Avançada</h1>
            <p>Demonstração de persistência segura e comunicação criptografada ponta a ponta.</p>

            <div class="crypto-badge">
              <i class="ph ph-lock-key"></i>
              <span>ESTADO CRIPTOGRAFADO EM MEMÓRIA</span>
            </div>
          </div>

          <div class="grid-layout">
            <!-- Coluna do Formulário -->
            <div class="column">
              <fy-card title="Formulário de Cadastro Seguro" mode="form">
                <div class="form-group">
                  <label>Nome Completo</label>
                  <fy-input
                    placeholder="Digite seu nome"
                    [value]="formData.name"
                    (fyChange)="updateField('name', $event)"
                    iconLeftName="user"
                  ></fy-input>
                </div>

                <div class="form-group">
                  <label>E-mail Confidencial</label>
                  <fy-input
                    type="email"
                    placeholder="email@privado.com"
                    [value]="formData.email"
                    (fyChange)="updateField('email', $event)"
                    iconLeftName="envelope"
                  ></fy-input>
                </div>

                <div class="form-group">
                  <label>Nível de Acesso</label>
                  <fy-select
                    [options]="roleOptions"
                    [placeholder]="'Selecione o nível'"
                    (fyChange)="updateField('role', $event)"
                  ></fy-select>
                </div>

                <div fy-card-actions>
                  <fy-button
                    label="Enviar Dados Criptografados"
                    variant="primary"
                    iconName="paper-plane-tilt"
                    (fyClick)="sendSecureData()"
                    [loading]="sending"
                  ></fy-button>
                </div>
              </fy-card>
            </div>

            <!-- Coluna de Inspeção de Segurança -->
            <div class="column">
              <fy-card title="Inspeção de Segurança (Estado Real)">
                <div class="security-monitor">
                  <p class="monitor-desc">Abaixo você vê como os valores estão persistidos no estado do componente:</p>

                  <div class="monitor-item" *ngFor="let field of ['name', 'email', 'role']">
                    <span class="field-label">{{ field | titlecase }}:</span>
                    <code class="secure-value">{{ encryptedState[field] || 'vazio' }}</code>
                  </div>

                  <div class="crypto-stats">
                    <div class="stat">
                      <span class="stat-val">AES-256-GCM</span>
                      <span class="stat-label">Algoritmo</span>
                    </div>
                    <div class="stat">
                      <span class="stat-val">Ativo</span>
                      <span class="stat-label">Proteção</span>
                    </div>
                  </div>
                </div>
              </fy-card>
            </div>
          </div>

          <!-- Seção de Log de API -->
          <div class="api-logs" *ngIf="apiLog">
            <fy-card [title]="'Fluxo de Comunicação HTTP (POST /api/secure-data)'" [mutedHeader]="true">
              <div class="logs-grid">
                <div class="log-box">
                  <span class="log-label request">JSON ENVIADO (CRIPTOGRAFADO)</span>
                  <pre class="json-view">{{ apiLog.request | json }}</pre>
                </div>
                <div class="log-box">
                  <span class="log-label response">JSON RECEBIDO (CRIPTOGRAFADO)</span>
                  <pre class="json-view">{{ apiLog.responseRaw | json }}</pre>
                </div>
              </div>

              <div class="log-box full">
                <span class="log-label success">RESPOSTA FINAL (DESCRIPTOGRAFADA)</span>
                <pre class="json-view decrypted">{{ apiLog.responseDecrypted | json }}</pre>
              </div>
            </fy-card>
          </div>
        </div>
      </fy-slot>
    </fy-layout>
  `,
  styles: [`
    .profile { display: flex; align-items: center; gap: 16px; }
    .profile .avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
    .profile-info .name { font-weight: 700; }
    .profile-info .role { font-size: 12px; opacity: 0.9; }

    .page-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px;
    }

    .header-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .crypto-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 99px;
      color: #10b981;
      font-size: 12px;
      font-weight: 700;
      width: fit-content;
    }

    .grid-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .form-group {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .security-monitor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .monitor-desc { font-size: 13px; opacity: 0.8; margin-bottom: 8px; }

    .monitor-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .field-label { font-size: 12px; font-weight: 600; text-transform: uppercase; opacity: 0.6; }

    .secure-value {
      background: #1e1e1e;
      color: #10b981;
      padding: 10px;
      border-radius: 6px;
      font-size: 11px;
      word-break: break-all;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .crypto-stats {
      display: flex;
      gap: 24px;
      margin-top: 8px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .stat { display: flex; flex-direction: column; }
    .stat-val { font-weight: 700; font-size: 14px; }
    .stat-label { font-size: 11px; opacity: 0.6; }

    .api-logs .logs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .log-box { display: flex; flex-direction: column; gap: 8px; }
    .log-box.full { margin-top: 16px; }

    .log-label {
      font-size: 11px;
      font-weight: 800;
      padding: 4px 8px;
      border-radius: 4px;
      width: fit-content;
    }

    .log-label.request { background: #3b82f6; color: white; }
    .log-label.response { background: #f59e0b; color: white; }
    .log-label.success { background: #10b981; color: white; }

    .json-view {
      background: #111;
      color: #eee;
      padding: 12px;
      border-radius: 6px;
      font-size: 12px;
      max-height: 200px;
      overflow-y: auto;
      margin: 0;
    }

    .json-view.decrypted {
      border: 1px solid rgba(16, 185, 129, 0.3);
      background: #0d1117;
    }

    @media (max-width: 992px) {
      .grid-layout, .api-logs .logs-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CryptoDemoComponent implements OnInit {
  private fylib = inject(FyLibService);
  private notify = inject(FyNotificationService);
  private webClient = inject(FyWebClientService);
  private cdr = inject(ChangeDetectorRef);

  // Dados reais (limpos) para os inputs vincularem
  formData: any = { name: '', email: '', role: '' };

  // Estado persistido criptografado (o que realmente "vale" para segurança)
  encryptedState: Record<string, string> = {};

  sending = false;
  apiLog: any = null;

  roleOptions = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Desenvolvedor', value: 'DEV' },
    { label: 'Analista', value: 'ANALYST' }
  ];

  notifications = [
    { id: '1', title: 'Segurança Máxima', description: 'O estado do componente é criptografado em tempo real.', date: new Date(), read: false }
  ];

  get unreadCount() { return this.notifications.filter(n => !n.read).length; }

  ngOnInit() {}

  async updateField(field: string, value: any) {
    const rawValue = Array.isArray(value) ? value[0] : value;
    this.formData[field] = rawValue;

    // Criptografa o valor para o estado persistido
    if (rawValue) {
      this.encryptedState[field] = await cryptoEngine.encrypt(String(rawValue), cryptoConfig);
    } else {
      this.encryptedState[field] = '';
    }
    this.cdr.markForCheck();
  }

  async sendSecureData() {
    this.sending = true;
    this.apiLog = null;
    this.cdr.markForCheck();

    // Simulamos a captura do payload que o WebClient enviaria
    const payloadToSend = {
      name: this.formData.name,
      email: this.formData.email,
      role: this.formData.role,
      sentAt: new Date().toISOString()
    };

    // Usamos o WebClient aprimorado que já faz tudo automático
    this.webClient.post('http://localhost:3002/api/secure-data', payloadToSend, {
      autoNotify: false // Vamos tratar o log manualmente aqui para a demo
    }).subscribe({
      next: async (decryptedResponse) => {
        // Capturamos o que aconteceu para o log da demo
        // Para mostrar o "bruto", precisamos fazer uma requisição manual ou interceptar
        // Aqui vamos simular o log bruto para fins didáticos, já que o WebClient esconde a complexidade
        const rawRequestPayload = await cryptoEngine.encrypt(JSON.stringify(payloadToSend), cryptoConfig);
        const rawResponsePayload = await cryptoEngine.encrypt(JSON.stringify(decryptedResponse), cryptoConfig);

        this.apiLog = {
          request: { payload: rawRequestPayload, encrypted: true },
          responseRaw: { payload: rawResponsePayload, protected: true },
          responseDecrypted: decryptedResponse
        };

        this.notify.success('Dados enviados e processados com segurança!');
        this.sending = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.notify.error('Falha na comunicação segura.');
        this.sending = false;
        this.cdr.markForCheck();
      }
    });
  }

  toggleMode() {
    const current = this.fylib.getMode();
    this.fylib.setMode(current === 'light' ? 'dark' : 'light');
  }
}
