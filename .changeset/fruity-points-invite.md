---
"@fylib/adapter-angular": patch
---

fix: inclusão de dependências de charts no schematic ng-add e reforço na atualização de versões.

- Adicionadas dependências `chart.js` e `ng2-charts` ao processo de instalação do `ng add`.
- O schematic agora força a atualização de todas as dependências do fyLib para a versão `latest`, mesmo que já existam no projeto.
- Melhorada a lógica de manipulação do `package.json` no schematic para garantir consistência e evitar duplicidade.
