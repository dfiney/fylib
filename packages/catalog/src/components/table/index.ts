import { UIComponentDefinition } from '@fylib/core';
import { IconSet } from '@fylib/config';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  iconName?: string;
  iconSet?: IconSet;
  hidden?: boolean;
}

export interface TableAction {
  id: string;
  label?: string;
  iconName?: string;
  iconSet?: IconSet;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  onClick?: (row: any) => void;
}

export interface TableProps {
  data: any[];
  columns: TableColumn[];
  title?: string;
  subtitle?: string;
  footer?: string;
  
  // Features
  loading?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  showPagination?: boolean;
  showSearch?: boolean;
  searchTargets?: string[];
  
  // Pagination
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  
  // Actions
  actions?: TableAction[];
  rowClickable?: boolean;
  
  // Style
  variant?: 'default' | 'striped' | 'bordered' | 'compact';
  stickyHeader?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
  
  // UI Level control
  activeAnimations?: boolean | null;
  activeEffects?: boolean | null;
  customStyles?: Record<string, string> | null;
}

export const TableDefinition: UIComponentDefinition<TableProps> = {
  name: 'table',
  version: '1.0.0',
  defaultProps: {
    data: [],
    columns: [],
    variant: 'default',
    showHeader: true,
    showFooter: false,
    showPagination: false,
    showSearch: false,
    searchTargets: [],
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    stickyHeader: false,
    scrollable: true,
    activeAnimations: null,
    activeEffects: null
  },
  variants: ['default', 'striped', 'bordered', 'compact'],
  features: {
    animations: {
      enter: 'table-fade-in',
      rowEnter: 'table-row-enter'
    },
    effects: {
      rowClick: 'confetti'
    }
  }
};
