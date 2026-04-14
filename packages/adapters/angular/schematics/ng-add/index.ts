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
  externalSchematic,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addFiles(),
      updateAppConfig(),
      updateAppComponent(),
      installDependencies(),
    ])(tree, context);
  };
}

function addFiles(): Rule {
  return mergeWith(
    apply(url('../templates'), [
      template({
        ...strings,
      }),
      move('src/fylib'),
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
      `import { FyLibService, FySSEService, FyThemeVarsDirective } from '@fylib/adapter-angular';\n` +
      `import { themeConfig } from '../fylib/theme.config';\n` +
      content;

    updatedContent = updatedContent.replace(
      /imports:\s*\[/,
      `imports: [FyThemeVarsDirective, `
    );

    updatedContent = updatedContent.replace(
      /export class (\w+) \{/,
      `export class $1 implements OnInit {\n  private fylib = inject(FyLibService);\n  private sse = inject(FySSEService);\n  protected readonly mode = signal<'light' | 'dark'>('light');\n\n  ngOnInit() {\n    this.fylib.setTheme(themeConfig.theme);\n    this.fylib.setMode(this.mode());\n  }\n`
    );

    tree.overwrite(targetPath, updatedContent);
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
