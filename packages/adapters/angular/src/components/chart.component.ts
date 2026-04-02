import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  inject,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartProps, ChartDefinition, ChartType, ChartSeries } from '@fylib/catalog';
import { FyLibService } from '../services/fylib.service';
import { BaseFyComponent } from '../base/base-component';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
} from 'chart.js';

@Component({
  selector: 'fy-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  template: `
    <div
      class="fy-chart-container"
      [class]="'fy-chart--' + variant"
      [class]="composeAnimClasses(animationClassSuffix)"
      [style]="getHostStyles(customStyles)"
    >
     
      @if(title || subtitle) {
        <div class="fy-chart__header" *ngIf="">
          @if(title) {
            <h3 class="fy-chart__title" *ngIf="title">{{ title }}</h3>
          }
          @if(subtitle) {
            <p class="fy-chart__subtitle" *ngIf="subtitle">{{ subtitle }}</p>
          }
        </div>
      }
      @if(chartData.datasets.length > 0) {
        <div class="fy-chart__content" [style.height]="height" [style.width]="width">
          <canvas
            baseChart
            [data]="chartData"
            [options]="chartOptions"
            [type]="chartJsType"
            (chartClick)="onChartClick($event)"
          >
          </canvas>
        </div>
      }
     
    </div>
  `,
  styles: [`
    .fy-chart-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: var(--fy-effects-chart-background, transparent);
      border: 1px solid var(--fy-effects-chart-borderColor, transparent);
      border-radius: var(--fy-borderRadius-lg, 12px);
      padding: var(--fy-spacing-md);
      box-sizing: border-box;
    }

    .fy-chart__header {
      margin-bottom: var(--fy-spacing-md);
    }

    .fy-chart__title {
      margin: 0;
      font-size: var(--fy-typography-fontSize-lg);
      font-weight: var(--fy-typography-fontWeight-bold);
      color: var(--fy-colors-text);
    }

    .fy-chart__subtitle {
      margin: 4px 0 0;
      font-size: var(--fy-typography-fontSize-sm);
      color: var(--fy-colors-secondary);
    }

    .fy-chart__content {
      position: relative;
      margin: auto;
      width: 100%;
    }

    .fy-chart--minimal {
      padding: 0;
      border: none;
      background: transparent;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyChartComponent extends BaseFyComponent<'fy-chart'> implements ChartProps, OnInit, OnChanges {
  @Input() type: ChartType = ChartDefinition.defaultProps!.type!;
  @Input() series: ChartSeries[] = ChartDefinition.defaultProps!.series!;
  @Input() categories?: string[];
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() height: string | number = '350px';
  @Input() width: string | number = '100%';
  
  @Input() colors?: string[];
  @Input() showLegend: boolean = ChartDefinition.defaultProps!.showLegend!;
  @Input() showGrid: boolean = ChartDefinition.defaultProps!.showGrid!;
  @Input() showLabels: boolean = ChartDefinition.defaultProps!.showLabels!;
  @Input() stacked: boolean = ChartDefinition.defaultProps!.stacked!;
  @Input() animated: boolean = ChartDefinition.defaultProps!.animated!;
  
  @Input() variant: 'default' | 'minimal' | 'compact' = 'default';
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Output() fyDataClick = new EventEmitter<any>();

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartData: ChartData<any> = { datasets: [] };
  public chartOptions: ChartConfiguration['options'] = {};
  public chartJsType: any = 'line';

  constructor() {
    super(inject(FyLibService), 'fy-chart');
  }

  ngOnInit() {
    this.updateChart();
    
    if (this.isAnimationsActive(this.activeAnimations)) {
      const anim = this.resolveAnim('enter', undefined, (ChartDefinition.features as any)?.animations?.enter);
      if (anim) this.fylib.playAnimation(anim);
      this.triggerByEvent('fy-chart.enter', undefined, this.activeEffects);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['series'] || changes['categories'] || changes['type'] || changes['stacked']) {
      this.updateChart();
    }
  }

  private updateChart() {
    this.chartJsType = this.mapType(this.type);
    const tokens = this.fylib.getTokens();
    const themeMode = this.fylib.getMode();
    const chartTokens = tokens.effects?.chart;

    const baseColors = this.colors || chartTokens?.colors || ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const labelColor = chartTokens?.labelColor || (themeMode === 'dark' ? '#9ca3af' : '#64748b');
    const gridColor = chartTokens?.gridColor || (themeMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(15, 23, 42, 0.05)');
    const fontFamily = chartTokens?.fontFamily || tokens.typography?.fontFamily?.base || 'inherit';

    // Map series to Chart.js datasets
    this.chartData = {
      labels: this.categories,
      datasets: this.series.map((s, i) => ({
        label: s.name,
        data: s.data,
        backgroundColor: this.type === 'pie' || this.type === 'donut' ? baseColors : baseColors[i % baseColors.length],
        borderColor: baseColors[i % baseColors.length],
        fill: this.type === 'area',
        tension: 0.4
      }))
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: this.animated && this.isAnimationsActive(this.activeAnimations) ? 800 : 0
      },
      plugins: {
        legend: {
          display: this.showLegend,
          position: 'bottom',
          labels: {
            color: labelColor as any,
            font: { family: fontFamily as string }
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
          backgroundColor: themeMode === 'dark' ? '#1f2937' : '#ffffff',
          titleColor: themeMode === 'dark' ? '#f9fafb' : '#111827',
          bodyColor: themeMode === 'dark' ? '#d1d5db' : '#4b5563',
          borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1
        }
      },
      scales: (this.type === 'pie' || this.type === 'donut' || this.type === 'radar' ? {} : {
        x: {
          stacked: this.stacked,
          display: this.showLabels,
          grid: {
            display: false,
            color: gridColor as any
          },
          ticks: {
            color: labelColor as any,
            font: { family: fontFamily as string }
          }
        },
        y: {
          stacked: this.stacked,
          display: this.showLabels,
          grid: {
            display: this.showGrid,
            color: gridColor as any
          },
          ticks: {
            color: labelColor as any,
            font: { family: fontFamily as string }
          }
        }
      }) as any
    };

    if (this.chart) {
      this.chart.update();
    }
  }

  private mapType(type: ChartType): string {
    switch (type) {
      case 'donut': return 'doughnut';
      case 'area': return 'line'; // Chart.js handles area as line with fill
      default: return type;
    }
  }

  onChartClick({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    if (active && active.length > 0) {
      this.fyDataClick.emit(active);
      this.triggerByEvent('fy-chart.dataClick', undefined, this.activeEffects);
    }
  }

  get animationClassSuffix(): string {
    const anim = this.resolveAnim('enter', undefined, (ChartDefinition.features as any)?.animations?.enter);
    return anim ? ` fy-anim-${anim}` : '';
  }
}
