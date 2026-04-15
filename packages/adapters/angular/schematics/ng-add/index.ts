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

    const content = tree.read(targetPath)?.toString('utf-8') || '';
    if (content.includes('FyLibService')) return tree;

    let updatedContent = `import { inject, OnInit, signal } from '@angular/core';\n` +
      `import { FyLibService, FySSEService, FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, FyButtonComponent, FyIconComponent, FyTextComponent } from '@fylib/adapter-angular';\n` +
      `import { themeConfig } from '../fylib/theme.config';\n` +
      content;

    updatedContent = updatedContent.replace(
      /imports:\s*\[/,
      `imports: [\n    FyThemeVarsDirective, FyLayoutComponent, FyCardComponent, FyButtonComponent, FyIconComponent, FyTextComponent,`
    );

    updatedContent = updatedContent.replace(
      /export class (\w+) \{/,
      `export class $1 implements OnInit {\n  private fylib = inject(FyLibService);\n  private sse = inject(FySSEService);\n  protected readonly mode = signal<'light' | 'dark'>('light');\n\n  ngOnInit() {\n    this.fylib.setTheme(themeConfig.theme);\n    this.fylib.setMode(this.mode());\n  }\n`
    );

    tree.overwrite(targetPath, updatedContent);
    return tree;
  };
}

function updateAppHTML(): Rule {
  return (tree: Tree) => {
    const htmlPath = 'src/app/app.component.html';
    if (!tree.exists(htmlPath)) return tree;

    const welcomeTemplate = `
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

    tree.overwrite(htmlPath, welcomeTemplate);
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
