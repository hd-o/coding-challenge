# 📝 Reactive To-Dos

`#mvc` `#react` `#rxjs`

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)][demo]

[demo]: https://stackblitz.com/github/hd-o/coding-challenge?configPath=packages/reactive-todos&file=packages/reactive-todos/index.html&startScript=run:reactive-todos

MVC React architecture with injected state observables, and isolated controller classes.

This experiment was done in preparation for [virtual-elevators][virtual_elevators]. The goal was to use [tsyringe][tsyringe]'s dependency container together with React's context, having state management handled by controller classes, and view rendering by React components, while maintaining isolation, and dependency injection for all modules (classes, and components)

---

<p align="center">
  <img
    src="./.assets/screenshot.png?v=4"
  />
</p>

[tsyringe]: https://github.com/Microsoft/tsyringe

[virtual_elevators]: ../virtual-elevators/
