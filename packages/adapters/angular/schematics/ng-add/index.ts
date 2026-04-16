import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  move,
  chain,
  mergeWith,
  forEach,
  FileEntry,
} from '@angular-devkit/schematics';
import { strings, Path } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

const THEMES = [
  { id: 'default', name: 'Padrão', color: '#3b82f6', icon: 'star' },
  { id: 'finey-workbench-1', name: 'Workbench', color: '#007aff', icon: 'briefcase' },
  { id: 'finey-puffy-1', name: 'Puffy', color: '#ff85a2', icon: 'heart' },
  { id: 'windows-xp', name: 'Legacy XP', color: '#3a6ea5', icon: 'monitor' },
  { id: 'windows-7', name: 'Legacy 7', color: '#2979ff', icon: 'desktop' },
  { id: 'christmas', name: 'Natal', color: '#af111c', icon: 'gift' },
  { id: 'finey-nexus-1', name: 'Nexus', color: '#22c55e', icon: 'cpu' },
  { id: 'finey-hub-1', name: 'Hub', color: '#0969da', icon: 'layout' }
];

export function ngAdd(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addFiles(),
      updateAppConfig(),
      updateAppComponent(),
      updateAppHTML(),
      installDependencies(),
    ])(tree, context);
  };
}

function addFiles(): Rule {
  return mergeWith(
    apply(url('../templates/fylib'), [
      template({
        ...strings,
      }),
      move('src/fylib'),
      forEach((fileEntry: FileEntry) => {
        if (fileEntry.path.endsWith('.template')) {
          return {
            content: fileEntry.content,
            path: fileEntry.path.replace('.template', '') as Path,
          };
        }
        return fileEntry;
      }),
    ])
  );
}

function updateAppConfig(): Rule {
  return (tree: Tree) => {
    const configPath = 'src/app/app.config.ts';
    if (!tree.exists(configPath)) return tree;

    const content = tree.read(configPath)?.toString('utf-8') || '';
    if (content.includes('provideFyLib')) return tree;

    let updatedContent = `import { provideFyLib } from '@fylib/adapter-angular';\n` +
      `import { themeConfig } from '../fylib/theme.config';\n` +
      `import { sseConfig } from '../fylib/sse.config';\n` +
      `import { cryptoConfig } from '../fylib/crypto.config';\n` +
      `import { loggingConfig } from '../fylib/logging.config';\n` +
      content;

    updatedContent = updatedContent.replace(
      /providers:\s*\[/,
      `providers: [\n    provideFyLib({\n      theme: themeConfig,\n      sse: sseConfig,\n      crypto: cryptoConfig,\n      logging: loggingConfig\n    }),`
    );

    tree.overwrite(configPath, updatedContent);
    return tree;
  };
}

function updateAppComponent(): Rule {
  return (tree: Tree) => {
    const appPath = 'src/app/app.component.ts';
    const altPath = 'src/app/app.ts';
    const targetPath = tree.exists(appPath) ? appPath : (tree.exists(altPath) ? altPath : null);

    if (!targetPath) return tree;

    let content = tree.read(targetPath)?.toString('utf-8') || '';
    if (content.includes('FyLibService')) return tree;

    // 1. Fix Angular Core Imports (avoid duplicates)
    if (content.includes('@angular/core')) {
      // Find the existing import from @angular/core
      const coreImportMatch = content.match(/import\s*{([^}]+)}\s*from\s*['"]@angular\/core['"]/);
      if (coreImportMatch) {
        const existingImports = coreImportMatch[1].split(',').map(i => i.trim());
        const neededImports = ['inject', 'OnInit', 'signal'];
        const toAdd = neededImports.filter(i => !existingImports.includes(i));
        
        if (toAdd.length > 0) {
          const newCoreImport = `import { ${[...existingImports, ...toAdd].join(', ')} } from '@angular/core'`;
          content = content.replace(coreImportMatch[0], newCoreImport);
        }
      }
    } else {
      content = `import { inject, OnInit, signal } from '@angular/core';\n` + content;
    }

    // 2. Add FyLib Imports
    const fylibImports = [
      'FyLibService', 'FySSEService', 'FyThemeVarsDirective', 
      'FyLayoutComponent', 'FyCardComponent', 'FyButtonComponent', 
      'FyIconComponent', 'FyTextComponent', 'FySlotComponent', 'FyBadgeComponent'
    ];
    content = `import { ${fylibImports.join(', ')} } from '@fylib/adapter-angular';\n` +
              `import { themeConfig } from '../fylib/theme.config';\n` + content;

    // 3. Update Component Decorator Imports
    if (content.includes('imports: [')) {
      content = content.replace(
        /imports:\s*\[/,
        `imports: [\n    FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, FyButtonComponent, FyIconComponent, FyTextComponent, FySlotComponent, FyBadgeComponent,`
      );
    } else {
      // If no imports array, add it (assuming it's a standalone component)
      content = content.replace(
        /@Component\({/,
        `@Component({\n  standalone: true,\n  imports: [\n    FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, FyButtonComponent, FyIconComponent, FyTextComponent, FySlotComponent, FyBadgeComponent\n  ],`
      );
    }

    // 4. Update Class Definition
    content = content.replace(
      /export class (\w+) \{/,
      `export class $1 implements OnInit {\n  protected fylib = inject(FyLibService);\n  private sse = inject(FySSEService);\n  protected readonly mode = signal<'light' | 'dark'>('light');\n  protected readonly themes = ${JSON.stringify(THEMES, null, 2)};\n\n  ngOnInit() {\n    this.fylib.setTheme(themeConfig.theme);\n    this.fylib.setMode(this.mode());\n  }\n\n  changeTheme(theme: string) {\n    this.fylib.setTheme(theme as any);\n  }\n\n  toggleMode() {\n    this.mode.set(this.mode() === 'light' ? 'dark' : 'light');\n    this.fylib.setMode(this.mode());\n  }\n\n  triggerConfetti() {\n    this.fylib.triggerEffect('confetti');\n  }\n`
    );

    tree.overwrite(targetPath, content);
    return tree;
  };
}

function updateAppHTML(): Rule {
  return (tree: Tree) => {
    const htmlPath = 'src/app/app.component.html';
    const altHtmlPath = 'src/app/app.html';
    const targetHtmlPath = tree.exists(htmlPath) ? htmlPath : (tree.exists(altHtmlPath) ? altHtmlPath : null);

    if (!targetHtmlPath) return tree;

    const content = tree.read(targetHtmlPath)?.toString('utf-8') || '';
    
    // Check if it's default Angular HTML
    const isDefault = content.includes('Next Steps') || 
                      content.includes('Resources') || 
                      content.includes('Congratulations! Your app is running.');

    if (isDefault) {
      tree.overwrite(targetHtmlPath, getWelcomeHTML());
    } else {
      // It's a custom project, create a separate component and route
      return chain([
        createWelcomeComponent(),
        updateRoutes()
      ]);
    }

    return tree;
  };
}

function getWelcomeHTML(): string {
  return `
<fy-layout name="app-layout" bgEffect="auto" fyWallpaper fyThemeVars [fixedHeight]="true">
  <!-- Slot: Header (Usando regiões nativas do fyLib) -->
  <fy-slot name="header">
    <div fy-header-logo style="display: flex; align-items: center; gap: 12px;">
      <fy-icon name="star" size="lg" style="color: var(--fy-colors-primary)"></fy-icon>
      <fy-text text="fyLib Starter" [strong]="true" size="lg"></fy-text>
    </div>

    <div fy-header-links-right style="display: flex; align-items: center; gap: 16px;">
      <fy-button variant="ghost" [iconName]="mode() === 'light' ? 'moon' : 'sun'" (click)="toggleMode()"></fy-button>
      <fy-button variant="primary" label="Documentação" iconName="book-open" link="https://github.com/dfiney/fylib/" target="_blank"></fy-button>
    </div>
  </fy-slot>

  <!-- Slot: Sidebar (Catálogo de Temas) -->
  <fy-slot name="sidebar">
    <div fy-sidebar-header style="padding: 16px 24px;">
      <fy-text text="Temas Disponíveis" size="sm" [strong]="true" style="opacity: 0.6; text-transform: uppercase; letter-spacing: 1px;"></fy-text>
    </div>
    
    <div fy-sidebar-links style="padding: 0 12px;">
      @for (theme of themes; track theme.id) {
        <fy-button 
          variant="ghost" 
          [label]="theme.name" 
          [iconName]="theme.icon" 
          (click)="changeTheme(theme.id)"
          style="width: 100%; justify-content: flex-start; margin-bottom: 4px; --fy-colors-primary: {{theme.color}}"
        >
          <div style="margin-left: auto; display: flex; gap: 4px;">
            <div [style.background]="theme.color" style="width: 8px; height: 8px; border-radius: 50%;"></div>
          </div>
        </fy-button>
      }
    </div>
    
    <div fy-sidebar-footer style="padding: 24px; border-top: 1px solid var(--fy-colors-border);">
       <fy-badge text="v1.0.0" [shine]="true" style="width: 100%; justify-content: center;"></fy-badge>
    </div>
  </fy-slot>

  <!-- Slot: Content (Área Principal) -->
  <fy-slot name="content">
    <div style="max-width: 900px; margin: 40px auto; display: flex; flex-direction: column; gap: 32px; padding: 0 24px;">
      
      <fy-card variant="elevated">
        <div fy-card-header>
          <fy-text text="🚀 Bem-vindo ao Universo fyLib" size="xl" [strong]="true"></fy-text>
        </div>
        
        <div style="padding: 16px 0;">
          <fy-text 
            text="Sua jornada para criar interfaces incríveis, modulares e temáticas começa agora. O fyLib separa a definição da renderização, permitindo que você troque toda a identidade visual da sua aplicação em tempo de execução."
            style="line-height: 1.8; color: var(--fy-colors-secondary); display: block;"
          ></fy-text>
        </div>

        <div fy-card-footer style="display: flex; gap: 16px; align-items: center;">
          <fy-button variant="primary" label="Explorar GitHub" iconName="github-logo" link="https://github.com/dfiney/fylib/" target="_blank"></fy-button>
          <fy-button variant="secondary" label="Ver LinkedIn" iconName="linkedin-logo" link="https://www.linkedin.com/in/victor-barberino-373797231/" target="_blank"></fy-button>
          
          <fy-text text="Finey 2026" size="sm" style="margin-left: auto; opacity: 0.5;"></fy-text>
        </div>
      </fy-card>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <fy-card>
          <div fy-card-header style="display: flex; align-items: center; gap: 12px;">
            <fy-icon name="magic-wand" size="md" style="color: var(--fy-colors-primary)"></fy-icon>
            <fy-text text="Engine de Efeitos" [strong]="true"></fy-text>
          </div>
          <fy-text text="Dispare efeitos globais como confetes ou neve diretamente de qualquer componente." size="sm" style="margin-bottom: 20px; display: block; opacity: 0.8;"></fy-text>
          <fy-button label="Testar Confetti" (click)="triggerConfetti()" style="width: 100%"></fy-button>
        </fy-card>

        <fy-card>
          <div fy-card-header style="display: flex; align-items: center; gap: 12px;">
            <fy-icon name="palette" size="md" style="color: var(--fy-colors-primary)"></fy-icon>
            <fy-text text="Design Tokens" [strong]="true"></fy-text>
          </div>
          <fy-text text="Todos os estilos são guiados por tokens, facilitando a manutenção e consistência visual." size="sm" style="margin-bottom: 20px; display: block; opacity: 0.8;"></fy-text>
          <div style="display: flex; gap: 8px;">
            <fy-badge text="Primary" style="--fy-badge-background: var(--fy-colors-primary); --fy-badge-textColor: white;"></fy-badge>
            <fy-badge text="Secondary" style="--fy-badge-background: var(--fy-colors-secondary); --fy-badge-textColor: white;"></fy-badge>
            <fy-badge text="Dark Mode" [glow]="mode() === 'dark'"></fy-badge>
          </div>
        </fy-card>
      </div>
    </div>
  </fy-slot>
</fy-layout>
`;
}

function createWelcomeComponent(): Rule {
  return (tree: Tree) => {
    const componentDir = 'src/app/fylib-welcome';
    if (tree.exists(`${componentDir}/fylib-welcome.component.ts`)) return tree;

    const tsContent = `import { Component, inject, OnInit, signal } from '@angular/core';
import { 
  FyLayoutComponent, FyCardComponent, FyButtonComponent, 
  FyIconComponent, FyTextComponent, FyThemeVarsDirective,
  FySlotComponent, FyBadgeComponent, FyLibService 
} from '@fylib/adapter-angular';

const THEMES = ${JSON.stringify(THEMES, null, 2)};

@Component({
  selector: 'app-fylib-welcome',
  standalone: true,
  imports: [
    FyLayoutComponent, FyCardComponent, FyButtonComponent, 
    FyIconComponent, FyTextComponent, FyThemeVarsDirective,
    FySlotComponent, FyBadgeComponent
  ],
  template: \`${getWelcomeHTML()}\`,
  styles: [\`
    :host { display: block; height: 100vh; }
  \`]
})
export class FylibWelcomeComponent implements OnInit {
  protected fylib = inject(FyLibService);
  protected readonly mode = signal<'light' | 'dark'>('light');
  protected readonly themes = THEMES;

  ngOnInit() {
    this.fylib.setTheme('default');
    this.fylib.setMode(this.mode());
  }

  changeTheme(theme: string) {
    this.fylib.setTheme(theme as any);
  }

  toggleMode() {
    this.mode.set(this.mode() === 'light' ? 'dark' : 'light');
    this.fylib.setMode(this.mode());
  }

  triggerConfetti() {
    this.fylib.triggerEffect('confetti');
  }
}
`;

    const htmlContent = getWelcomeHTML();

    tree.create(`${componentDir}/fylib-welcome.component.ts`, tsContent);
    tree.create(`${componentDir}/fylib-welcome.component.html`, htmlContent);

    return tree;
  };
}

function updateRoutes(): Rule {
  return (tree: Tree) => {
    const routesPath = 'src/app/app.routes.ts';
    if (!tree.exists(routesPath)) return tree;

    let content = tree.read(routesPath)?.toString('utf-8') || '';
    if (content.includes('fylib-welcome')) return tree;

    // Add import
    content = `import { FylibWelcomeComponent } from './fylib-welcome/fylib-welcome.component';\n` + content;

    // Add route to the routes array
    content = content.replace(
      /export const routes: Routes = \[/,
      `export const routes: Routes = [\n  { path: 'fylib-welcome', component: FylibWelcomeComponent },`
    );

    tree.overwrite(routesPath, content);
    return tree;
  };
}

function installDependencies(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.addTask(
      new NodePackageInstallTask({
        packageName: [
          '@fylib/core',
          '@fylib/config',
          '@fylib/theme',
          '@fylib/animation',
          '@fylib/catalog',
          '@fylib/crypto',
          '@fylib/logger',
          '@fylib/adapter-angular',
        ].join(' '),
      })
    );
  };
}
