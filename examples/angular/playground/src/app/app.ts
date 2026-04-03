import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FyLibService, FyThemeVarsDirective, FySSEService } from '@fylib/adapter-angular';
import { themeConfig } from '../fylib/theme.config';

@Component({

  selector: 'app-root',
  imports: [RouterOutlet, FyThemeVarsDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('fyLib Angular Playground');
  private fylib = inject(FyLibService);
  private sse = inject(FySSEService);
  protected readonly mode = signal<'light' | 'dark'>('light');

  ngOnInit() {
    // Inicializa com um tema e modo
    this.fylib.setTheme(themeConfig.theme);
    this.fylib.setMode(this.mode());

    // SSE é inicializado automaticamente pelo serviço ao ser injetado,
    // mas garantimos que ele está pronto
    console.log('[Playground] SSE Service Initialized');
  }

  toggleMode() {
    const current = this.mode();
    const next = current === 'light' ? 'dark' : 'light';
    this.mode.set(next);
    this.fylib.setMode(next);
  }

  onButtonClick() {
    console.log('Botão clicado!');
    this.fylib.triggerEffect('confetti');
  }
}
