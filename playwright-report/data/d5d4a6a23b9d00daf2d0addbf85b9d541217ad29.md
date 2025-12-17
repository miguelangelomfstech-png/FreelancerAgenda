# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: "[plugin:vite:css] [postcss] C:/Users/migue/git/FreelancerAgenda/src/index.css:1:1: The `border-border` class does not exist. If `border-border` is a custom class, make sure it is defined within a `@layer` directive."
  - generic [ref=e5]: C:/Users/migue/git/FreelancerAgenda/src/index.css:1:0
  - generic [ref=e6]: 1 | @tailwind base; | ^ 2 | @tailwind components; 3 | @tailwind utilities;
  - generic [ref=e7]: at Input.error (C:\Users\migue\git\FreelancerAgenda\node_modules\postcss\lib\input.js:135:16) at AtRule.error (C:\Users\migue\git\FreelancerAgenda\node_modules\postcss\lib\node.js:146:32) at processApply (C:\Users\migue\git\FreelancerAgenda\node_modules\tailwindcss\lib\lib\expandApplyAtRules.js:380:29) at C:\Users\migue\git\FreelancerAgenda\node_modules\tailwindcss\lib\lib\expandApplyAtRules.js:551:9 at C:\Users\migue\git\FreelancerAgenda\node_modules\tailwindcss\lib\processTailwindFeatures.js:55:50 at async plugins (C:\Users\migue\git\FreelancerAgenda\node_modules\tailwindcss\lib\plugin.js:38:17) at async LazyResult.runAsync (C:\Users\migue\git\FreelancerAgenda\node_modules\postcss\lib\lazy-result.js:293:11) at async runPostCSS (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:30144:19) at async compilePostCSS (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:30128:6) at async compileCSS (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:30058:26) at async TransformPluginContext.handler (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:29591:54) at async EnvironmentPluginContainer.transform (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:28796:14) at async loadAndTransform (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:22669:26) at async viteTransformMiddleware (file:///C:/Users/migue/git/FreelancerAgenda/node_modules/vite/dist/node/chunks/config.js:24541:20)
  - generic [ref=e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.
    - text: You can also disable this overlay by setting
    - code [ref=e9]: server.hmr.overlay
    - text: to
    - code [ref=e10]: "false"
    - text: in
    - code [ref=e11]: vite.config.ts
    - text: .
```