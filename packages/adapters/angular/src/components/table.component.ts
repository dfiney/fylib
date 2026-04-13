import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  inject,
  OnInit,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableProps, TableDefinition, TableColumn, TableAction } from '@fylib/catalog';
import { FyLibService } from '../services/fylib.service';
import { BaseFyComponent } from '../base/base-component';
import { FyIconComponent } from './icon.component';
import { FyInputComponent } from './input.component';
import { FyButtonComponent } from './button.component';


@Component({
  selector: 'fy-table',
  standalone: true,
  imports: [
    CommonModule,
    FyIconComponent,
    FyInputComponent,
    FyButtonComponent
  ],
  template: `
    <div
      class="fy-table-container"
      [class.fy-table--scrollable]="scrollable"
      [class.fy-table--sticky]="stickyHeader"
      [class]="composeAnimClasses(animationClassSuffix)"
      [style]="getHostStyles(customStyles)"
      
    >
      <!-- Header / Search / Title -->
      @if (showHeader || title || showSearch) {
        <header class="fy-table__header">
          @if (title || subtitle) {
            <div class="fy-table__header-main">
              @if (title) { <h3 class="fy-table__title">{{ title }}</h3> }
              @if (subtitle) { <p class="fy-table__subtitle">{{ subtitle }}</p> }
            </div>
          }

          <div class="fy-table__header-tools">
            @if (showSearch) {
              <div class="fy-table__search">
                <fy-input
                  placeholder="Pesquisar..."
                  iconLeftName="search"
                  size="sm"
                  (fyInput)="onSearch($event)"
                ></fy-input>
              </div>
            }
            <ng-content select="[fy-table-tools]"></ng-content>
          </div>
        </header>
      }

      <!-- Table Content -->
      <div class="fy-table__content" [style.maxHeight]="maxHeight">
        <table class="fy-table" [class]="'fy-table--' + variant">
          <thead>
            <tr>
              @for (col of visibleColumns; track col.key) {
                <th
                  [style.width]="col.width"
                  [class.fy-table__th--sortable]="col.sortable"
                  [style.textAlign]="col.align || 'left'"
                  (click)="onSort(col)"
                >
                  <div class="fy-table__th-content">
                    @if (col.iconName) {
                      <fy-icon
                        [name]="col.iconName"
                        [set]="col.iconSet"
                        class="fy-table__th-icon"
                      ></fy-icon>
                    }
                    <span>{{ col.label }}</span>
                    @if (col.sortable) {
                      <fy-icon
                        [name]="getSortIcon(col)"
                        class="fy-table__sort-icon"
                      ></fy-icon>
                    }
                  </div>
                </th>
              }
              @if (actions && actions.length > 0) {
                <th class="fy-table__th--actions">
                  Ações
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @if (loading) {
              <tr class="fy-table__row--loading">
                <td [attr.colspan]="totalColumns" class="fy-table__td--loading">
                  <div class="fy-table__loader"></div>
                </td>
              </tr>
            }
            
            @if (!loading && (!data || data.length === 0)) {
              <tr class="fy-table__row--empty">
                <td [attr.colspan]="totalColumns" class="fy-table__td--empty">
                  Nenhum registro encontrado.
                </td>
              </tr>
            }

            @if (!loading) {
              @for (row of paginatedData; track $index) {
                <tr
                  class="fy-table__row"
                  [class.fy-table__row--clickable]="rowClickable"
                  (click)="onRowClick(row)"
                >
                  @for (col of visibleColumns; track col.key) {
                    <td
                      [style.textAlign]="col.align || 'left'"
                    >
                      <!-- Custom Cell Template -->
                      @if (cellTemplate) {
                        <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: row, column: col }"></ng-container>
                      } @else {
                        {{ row[col.key] }}
                      }
                    </td>
                  }
                  
                  @if (actions && actions.length > 0) {
                    <td class="fy-table__td--actions">
                      <div class="fy-table__actions-group">
                        @for (action of actions; track action.label) {
                          <fy-button
                            [iconName]="action.iconName"
                            [label]="action.label"
                            [variant]="action.variant || 'ghost'"
                            size="sm"
                            (fyClick)="onActionClick($event, action, row)"
                          ></fy-button>
                        }
                      </div>
                    </td>
                  }
                </tr>
              }
            }
          </tbody>
        </table>
      </div>

      <!-- Footer / Pagination -->
      @if (showFooter || showPagination || footer) {
        <footer class="fy-table__footer">
          @if (footer || showPagination) {
            <div class="fy-table__footer-info">
              @if (footer) { <span>{{ footer }}</span> }
              @if (showPagination) {
                <span class="fy-table__pagination-summary">
                  Mostrando {{ startItem }} - {{ endItem }} de {{ displayTotal }}
                </span>
              }
            </div>
          }

          @if (showPagination) {
            <div class="fy-table__pagination">
              <fy-button
                variant="ghost"
                size="sm"
                iconName="caret-left"
                [disabled]="currentPage === 1"
                (fyClick)="onPageChange(currentPage - 1)"
              ></fy-button>
              
              <div class="fy-table__pages">
                 <span class="fy-table__page-info">{{ currentPage }} / {{ totalPages }}</span>
              </div>

              <fy-button
                variant="ghost"
                size="sm"
                iconName="caret-right"
                [disabled]="currentPage === totalPages"
                (fyClick)="onPageChange(currentPage + 1)"
              ></fy-button>
            </div>
          }
        </footer>
      }
    </div>
  `,
  styles: [`
    .fy-table-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: var(--fy-effects-table-background, #fff);
      border: 1px solid var(--fy-effects-table-borderColor, rgba(0,0,0,0.08));
      border-radius: var(--fy-borderRadius-lg, 12px);
      overflow: hidden;
    }

    .fy-table__header {
      padding: var(--fy-spacing-md);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--fy-effects-table-borderColor);
      gap: 16px;
      flex-wrap: wrap;
    }

    .fy-table__header-tools {
      display: flex;
      gap: 12px;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .fy-table__header-tools ::ng-deep [fy-table-tools] {
      display: flex;
      gap: 8px;
    }

    .fy-table__actions-group {
      display: flex;
      gap: 6px;
    }

    @media (max-width: 640px) {
      .fy-table__header-tools {
        justify-content: flex-start;
      }
      
      .fy-table__header-tools ::ng-deep [fy-table-tools] {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 4px;
      }

      .fy-table__header-tools ::ng-deep [fy-table-tools] fy-button .fy-button__label {
        display: none;
      }

      .fy-table__header-tools ::ng-deep [fy-table-tools] fy-button .fy-button {
        padding: var(--fy-spacing-sm);
      }
    }

    .fy-table__title {
      margin: 0;
      font-size: var(--fy-typography-fontSize-lg);
      font-weight: var(--fy-typography-fontWeight-bold);
    }

    .fy-table__subtitle {
      margin: 4px 0 0;
      font-size: var(--fy-typography-fontSize-sm);
      color: var(--fy-colors-secondary);
    }

    .fy-table__header-tools {
      display: flex;
      gap: 12px;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }

    .fy-table__search {
      max-width: 300px;
      width: 100%;
    }

    .fy-table__content {
      width: 100%;
      overflow-x: auto;
    }

    .fy-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: var(--fy-typography-fontSize-md);
    }

    .fy-table th {
      padding: var(--fy-spacing-md);
      background: var(--fy-effects-table-headerBackground, rgba(0,0,0,0.02));
      color: var(--fy-colors-text);
      font-weight: var(--fy-typography-fontWeight-bold);
      border-bottom: 1px solid var(--fy-effects-table-borderColor);
      white-space: nowrap;
    }

    .fy-table td {
      padding: var(--fy-spacing-md);
      border-bottom: 1px solid var(--fy-effects-table-borderColor);
      color: var(--fy-colors-text);
    }

    .fy-table__row:last-child td {
      border-bottom: none;
    }

    .fy-table__row:hover {
      background: var(--fy-effects-table-rowHoverBackground, rgba(0,0,0,0.01));
    }

    .fy-table__row--clickable {
      cursor: pointer;
    }

    .fy-table--striped tbody tr:nth-child(even) {
      background: var(--fy-effects-table-stripedBackground, rgba(0,0,0,0.005));
    }

    .fy-table--bordered td, 
    .fy-table--bordered th {
      border: 1px solid var(--fy-effects-table-borderColor);
    }

    .fy-table--compact td,
    .fy-table--compact th {
      padding: var(--fy-spacing-sm);
    }

    .fy-table__th-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .fy-table__th--sortable {
      cursor: pointer;
      user-select: none;
    }

    .fy-table__th--sortable:hover {
      background: rgba(0,0,0,0.04);
    }

    .fy-table__footer {
      padding: var(--fy-spacing-md);
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--fy-effects-table-borderColor);
      background: var(--fy-effects-table-headerBackground);
    }

    .fy-table__pagination {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .fy-table__page-info {
      font-size: var(--fy-typography-fontSize-sm);
      font-weight: var(--fy-typography-fontWeight-bold);
    }

    .fy-table__loader {
      width: 24px;
      height: 24px;
      border: 3px solid var(--fy-colors-primary);
      border-bottom-color: transparent;
      border-radius: 50%;
      margin: 24px auto;
      animation: fy-spin 0.8s linear infinite;
    }

    @keyframes fy-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 640px) {
      .fy-table__header {
        flex-direction: column;
        align-items: stretch;
      }
      .fy-table__search {
        max-width: 100%;
      }
      .fy-table__footer {
        flex-direction: column;
        gap: 16px;
      }
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class FyTableComponent extends BaseFyComponent<'fy-table'> implements TableProps, OnInit {
  @Input() data: any[] = TableDefinition.defaultProps!.data!;
  @Input() columns: TableColumn[] = TableDefinition.defaultProps!.columns!;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() footer?: string;
  @Input() loading: boolean = false;
  @Input() showHeader: boolean = TableDefinition.defaultProps!.showHeader!;
  @Input() showFooter: boolean = TableDefinition.defaultProps!.showFooter!;
  @Input() showPagination: boolean = TableDefinition.defaultProps!.showPagination!;
  @Input() showSearch: boolean = TableDefinition.defaultProps!.showSearch!;
  @Input() currentPage: number = TableDefinition.defaultProps!.currentPage!;
  @Input() pageSize: number = TableDefinition.defaultProps!.pageSize!;
  @Input() totalItems: number = TableDefinition.defaultProps!.totalItems!;
  @Input() searchTargets: string[] = TableDefinition.defaultProps!.searchTargets || [];
  @Input() actions?: TableAction[];
  @Input() rowClickable: boolean = false;
  @Input() variant: TableProps['variant'] = TableDefinition.defaultProps!.variant!;
  @Input() stickyHeader: boolean = TableDefinition.defaultProps!.stickyHeader!;
  @Input() scrollable: boolean = TableDefinition.defaultProps!.scrollable!;
  @Input() maxHeight?: string;
  @Input() activeAnimations: boolean | null = null;
  @Input() activeEffects: boolean | null = null;
  @Input() customStyles: Record<string, string> | null = null;

  @Output() fySearch = new EventEmitter<string>();
  @Output() fySort = new EventEmitter<TableColumn & { direction: 'asc' | 'desc' | null }>();
  @Output() fyPageChange = new EventEmitter<number>();
  @Output() fyRowClick = new EventEmitter<any>();

  @ContentChild('cellTemplate') cellTemplate?: TemplateRef<any>;

  private sortKey: string | null = null;
  private sortDirection: 'asc' | 'desc' | null = null;
  private searchTerm: string = '';

  constructor() {
    super(inject(FyLibService), 'fy-table');
  }

  get paginatedData() {
    let list = this.data || [];
    
    // Filter locally if searchTargets are provided
    if (this.searchTerm && this.searchTargets && this.searchTargets.length > 0) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(item => 
        this.searchTargets.some(target => 
          String(item[target] || '').toLowerCase().includes(term)
        )
      );
    }
    
    // Pagination logic
    if (this.showPagination) {
      const start = (this.currentPage - 1) * this.pageSize;
      return list.slice(start, start + this.pageSize);
    }
    
    return list;
  }

  get filteredTotal() {
    if (this.searchTerm && this.searchTargets && this.searchTargets.length > 0) {
      const term = this.searchTerm.toLowerCase();
      return (this.data || []).filter(item => 
        this.searchTargets.some(target => 
          String(item[target] || '').toLowerCase().includes(term)
        )
      ).length;
    }
    return (this.data || []).length;
  }

  ngOnInit() {
    if (this.isAnimationsActive(this.activeAnimations)) {
      const anim = this.resolveAnim('enter', undefined, (TableDefinition.features as any)?.animations?.enter);
      if (anim) this.fylib.playAnimation(anim);
      this.triggerByEvent('fy-table.enter', undefined, this.activeEffects);
    }
  }

  get visibleColumns() {
    return this.columns.filter(c => !c.hidden);
  }

  get totalColumns() {
    let count = this.visibleColumns.length;
    if (this.actions && this.actions.length > 0) count++;
    return count;
  }

  get totalPages() {
    const total = this.showSearch ? this.filteredTotal : (this.totalItems || (this.data?.length || 0));
    return Math.ceil(total / this.pageSize) || 1;
  }

  get startItem() {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem() {
    const total = this.showSearch ? this.filteredTotal : (this.totalItems || (this.data?.length || 0));
    return Math.min(this.currentPage * this.pageSize, total);
  }

  get displayTotal() {
    return this.showSearch ? this.filteredTotal : (this.totalItems || (this.data?.length || 0));
  }

  get animationClassSuffix(): string {
    const anim = this.resolveAnim('enter', undefined, (TableDefinition.features as any)?.animations?.enter);
    return this.composeAnimClasses(anim);
  }

  onSearch(value: string) {
    this.searchTerm = value;
    this.currentPage = 1; // Reset to first page on search
    this.fySearch.emit(value);
  }

  onSort(col: TableColumn) {
    if (!col.sortable) return;

    if (this.sortKey === col.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : (this.sortDirection === 'desc' ? null : 'asc');
    } else {
      this.sortKey = col.key;
      this.sortDirection = 'asc';
    }

    this.fySort.emit({ ...col, direction: this.sortDirection });
  }

  getSortIcon(col: TableColumn): string {
    if (this.sortKey !== col.key || !this.sortDirection) return 'caret-up-down';
    return this.sortDirection === 'asc' ? 'caret-up' : 'caret-down';
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.fyPageChange.emit(page);
  }

  onRowClick(row: any) {
    if (!this.rowClickable) return;
    
    if (this.isAnimationsActive(this.activeAnimations)) {
       this.triggerByEvent('fy-table.rowClick', undefined, this.activeEffects);
    }
    
    this.fyRowClick.emit(row);
  }

  onActionClick(event: MouseEvent, action: TableAction, row: any) {
    event.stopPropagation();
    action.onClick?.(row);
  }
}
