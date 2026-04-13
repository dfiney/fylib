import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FyAccordionComponent } from '@fylib/adapter-angular';
import { By } from '@angular/platform-browser';

describe('FyAccordionComponent A11y', () => {
  let component: FyAccordionComponent;
  let fixture: ComponentFixture<FyAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FyAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FyAccordionComponent);
    component = fixture.componentInstance;
    component.items = [
      { id: '1', title: 'Item 1', content: 'Content 1' },
      { id: '2', title: 'Item 2', content: 'Content 2' }
    ];
    fixture.detectChanges();
  });

  it('should have correct ARIA attributes for headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('.fy-accordion__header'));
    
    expect(headers[0].nativeElement.getAttribute('role')).toBe('button');
    expect(headers[0].nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(headers[0].nativeElement.getAttribute('aria-controls')).toBe('fy-accordion-panel-1');
    expect(headers[0].nativeElement.getAttribute('tabindex')).toBe('0');
  });

  it('should toggle aria-expanded when clicked', () => {
    const header = fixture.debugElement.query(By.css('.fy-accordion__header'));
    header.nativeElement.click();
    fixture.detectChanges();
    
    expect(header.nativeElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('should toggle on Enter key', () => {
    const header = fixture.debugElement.query(By.css('.fy-accordion__header'));
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    header.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
    
    expect(header.nativeElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have aria-hidden true on collapsed panels', () => {
    const panels = fixture.debugElement.queryAll(By.css('.fy-accordion__panel-wrapper'));
    expect(panels[0].nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have role="region" on panels', () => {
    const panels = fixture.debugElement.queryAll(By.css('.fy-accordion__panel-wrapper'));
    expect(panels[0].nativeElement.getAttribute('role')).toBe('region');
  });
});
