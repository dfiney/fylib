import { UIComponentDefinition } from '@fylib/core';

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radar';

export interface ChartSeries {
  name: string;
  data: number[];
}

export interface ChartProps {
  type: ChartType;
  series: ChartSeries[];
  categories?: string[];
  title?: string;
  subtitle?: string;
  height?: string | number;
  width?: string | number;
  
  // Customization
  colors?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  stacked?: boolean;
  animated?: boolean;
  
  // UI Level control
  activeAnimations?: boolean | null;
  activeEffects?: boolean | null;
  customStyles?: Record<string, string> | null;
}

export const ChartDefinition: UIComponentDefinition<ChartProps> = {
  name: 'chart',
  version: '1.0.0',
  defaultProps: {
    type: 'line',
    series: [],
    height: '350px',
    width: '100%',
    showLegend: true,
    showGrid: true,
    showLabels: true,
    stacked: false,
    animated: true,
    activeAnimations: null,
    activeEffects: null
  },
  variants: ['default', 'minimal', 'compact'],
  features: {
    animations: {
      enter: 'chart-fade-in',
      update: 'chart-data-update'
    },
    effects: {
      onDataClick: 'confetti'
    }
  }
};
