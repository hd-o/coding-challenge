# 👁️‍🗨️ Social Media Dashboard

`#dashboard` `#react` `#ui`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

Responsive, drag & drop enabled dashboard

---

![dashboard desktop screenshot, dark theme](.assets/desktop-dark.png)

---

## Reference

- Framework: [Next.js][next]
  - Rendering: [React.js][react]
  - Language: [TypeScript][typescript]
- Intl / Formatting: [react-intl][react-intl]
  - Message definitions: [/lang/en-US.json](./lang/en-US.json)
  - Initialization: [/pages/_app.tsx](./pages/_app.tsx)
  - Next.js intl setup: [/next.config.js](./next.config.js)
- IoC Container: [function-context](./src/util/function-context/context.ts)
  - Specification: [/spec/function-context](./spec/function-context/index.test.ts)
- State Management: [RxJS][rxjs]
  - Data structures: [Immutable.js][immutable]
- Styling / Components: [MUI][mui]
  - Theme definitions: [/src/styles/theme](./src/styles/theme/index.ts)
  - Theme persistance: [/src/styles/theme/state](./src/styles/theme/state/index.ts)
- Testing / Specs: [jest][jest]
  - Utilities: [@testing-library][testing-library]
- User Interaction:
  - Drag & Drop: [react-dnd][react-dnd]
  - Persistance: [react-cookie][react-cookie]
  - Persistance util: [/src/util/use-order-state.ts](./src/util/use-order-state.ts)

[develop]: ../../.shared/node/README.md#development
[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/social-dashboard

[immutable]: https://immutable-js.com/docs/v4.0.0
[jest]: https://jestjs.io/docs/getting-started
[mui]: https://mui.com/getting-started/usage/
[next]: https://nextjs.org/docs/getting-started
[node]: https://nodejs.org/en/
[react]: https://reactjs.org/docs/getting-started.html
[react-cookie]: https://github.com/reactivestack/cookies/tree/master/packages/react-cookie
[react-dnd]:  https://react-dnd.github.io/react-dnd/about
[react-intl]: https://formatjs.io/docs/react-intl
[rxjs]: https://rxjs.dev/guide/overview
[testing-library]: https://testing-library.com/docs/react-testing-library/intro
[typescript]: https://www.typescriptlang.org/docs/handbook/intro.html
