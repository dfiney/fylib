import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FyLibService, FyThemeVarsDirective } from '@fylib/adapter-angular';
import { themeControllerConfig } from 'src/fylib/theme-controller.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FyThemeVarsDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('fyLib Angular Playground');
  private fylib = inject(FyLibService);
  protected readonly mode = signal<'light' | 'dark'>('light');

  ngOnInit() {
    // Inicializa com um tema e modo
    this.fylib.setTheme(themeControllerConfig.theme);
    this.fylib.setMode(this.mode());
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
