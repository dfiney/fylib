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
      'FyIconComponent', 'FyTextComponent'
    ];
    content = `import { ${fylibImports.join(', ')} } from '@fylib/adapter-angular';\n` +
              `import { themeConfig } from '../fylib/theme.config';\n` + content;

    // 3. Update Component Decorator Imports
    if (content.includes('imports: [')) {
      content = content.replace(
        /imports:\s*\[/,
        `imports: [\n    FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, FyButtonComponent, FyIconComponent, FyTextComponent,`
      );
    } else {
      // If no imports array, add it (assuming it's a standalone component)
      content = content.replace(
        /@Component\({/,
        `@Component({\n  standalone: true,\n  imports: [\n    FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, FyButtonComponent, FyIconComponent, FyTextComponent\n  ],`
      );
    }

    // 4. Update Class Definition
    content = content.replace(
      /export class (\w+) \{/,
      `export class $1 implements OnInit {\n  private fylib = inject(FyLibService);\n  private sse = inject(FySSEService);\n  protected readonly mode = signal<'light' | 'dark'>('light');\n\n  ngOnInit() {\n    this.fylib.setTheme(themeConfig.theme);\n    this.fylib.setMode(this.mode());\n  }\n`
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
<div fyThemeVars class="fy-app-container">
  <fy-layout name="app-layout" bgEffect="aurora" [bgEffectIntensity]="0.4">
    <div class="welcome-container">
      <fy-card variant="elevated" class="welcome-card">
        <div fy-card-header class="welcome-header">
          <div class="logo-box">
            <fy-icon name="star" size="lg"></fy-icon>
          </div>
          <fy-text text="Bem-vindo ao fyLib" class="welcome-title"></fy-text>
        </div>

        <div class="welcome-content">
          <p class="welcome-desc">
            Sua jornada para criar interfaces incríveis, modulares e temáticas começa aqui. 
            O fyLib já está configurado e pronto para uso!
          </p>

          <div class="welcome-actions">
            <a href="https://github.com/dfiney/fylib/" target="_blank">
              <fy-button variant="primary" label="GitHub do Projeto" iconName="search"></fy-button>
            </a>
            <a href="https://www.linkedin.com/in/victor-barberino-373797231/" target="_blank">
              <fy-button variant="secondary" label="LinkedIn do Autor" iconName="user"></fy-button>
            </a>
          </div>
        </div>

        <div fy-card-footer class="welcome-footer">
          <fy-text text="© Finey 2026 · Built with Passion"></fy-text>
        </div>
      </fy-card>
    </div>
  </fy-layout>
</div>

<style>
  .fy-app-container {
    height: 100vh;
    width: 100%;
    overflow: hidden;
  }
  .welcome-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
  }
  .welcome-card {
    max-width: 500px;
    width: 100%;
    animation: fadeInScale 0.6s ease-out;
  }
  .welcome-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px 0 16px;
  }
  .logo-box {
    background: var(--fy-colors-primary);
    color: white;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(var(--fy-colors-primary-rgb), 0.3);
  }
  .welcome-title {
    font-size: 28px;
    font-weight: 800;
    color: var(--fy-colors-text);
  }
  .welcome-content {
    text-align: center;
    padding: 0 24px 24px;
  }
  .welcome-desc {
    color: var(--fy-colors-secondary);
    line-height: 1.6;
    margin-bottom: 32px;
  }
  .welcome-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .welcome-actions a {
    width: 100%;
  }
  .welcome-actions fy-button {
    width: 100%;
  }
  .welcome-footer {
    opacity: 0.6;
    font-size: 12px;
    justify-content: center;
  }

  @keyframes fadeInScale {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
</style>
`;
}

function createWelcomeComponent(): Rule {
  return (tree: Tree) => {
    const componentDir = 'src/app/fylib-welcome';
    if (tree.exists(`${componentDir}/fylib-welcome.component.ts`)) return tree;

    const tsContent = `import { Component } from '@angular/core';
import { 
  FyLayoutComponent, FyCardComponent, FyButtonComponent, 
  FyIconComponent, FyTextComponent, FyThemeVarsDirective 
} from '@fylib/adapter-angular';

@Component({
  selector: 'app-fylib-welcome',
  standalone: true,
  imports: [
    FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, 
    FyButtonComponent, FyIconComponent, FyTextComponent
  ],
  templateUrl: './fylib-welcome.component.html',
  styles: [\`
    :host { display: block; height: 100vh; }
    .fy-app-container { height: 100vh; width: 100%; overflow: hidden; }
    .welcome-container { display: flex; align-items: center; justify-content: center; height: 100%; padding: 20px; }
    .welcome-card { max-width: 500px; width: 100%; animation: fadeInScale 0.6s ease-out; }
    .welcome-header { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px 0 16px; }
    .logo-box { background: var(--fy-colors-primary); color: white; padding: 16px; border-radius: 16px; box-shadow: 0 8px 16px rgba(var(--fy-colors-primary-rgb), 0.3); }
    .welcome-title { font-size: 28px; font-weight: 800; color: var(--fy-colors-text); }
    .welcome-content { text-align: center; padding: 0 24px 24px; }
    .welcome-desc { color: var(--fy-colors-secondary); line-height: 1.6; margin-bottom: 32px; }
    .welcome-actions { display: flex; flex-direction: column; gap: 12px; }
    .welcome-actions a { width: 100%; }
    .welcome-footer { opacity: 0.6; font-size: 12px; justify-content: center; }
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  \`]
})
export class FylibWelcomeComponent {}
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
