# 📅 SOLID Calendar

`#functional` `#react` `#solid`

[![Open in CodeSandbox](https://img.shields.io/badge/Open-＠CodeSandbox-blue?style=flat-square&logo=codesandbox)][live_demo]
[![Develop on localhost](https://img.shields.io/badge/Develop-＠localhost-DDD?style=flat-square&logo=gnubash&logoColor=EEE)][develop]

Research on coding a SOLID and functional front-end architecture with React.

**Architecture features:**

- Inversion of control on all dependencies
  - All dependencies can be injected/swapped at runtime
  - Dependencies are resolved by React's context
- Functional components, and state definition
  - All modules are lazy-loadable
  - Isolated, and reusable functionality

**Calendar features:**

- Calendar month selection
- Reminder editing for a given day
  - Reminders with date, location, and title
  - Weather forecast for chosen reminder location

---

<table>
  <tr>
    <td>
      <img
        alt="calendar month view screenshot"
        src="./assets/screenshot-calendar.png"
      />
    </td>
    <td>
      <img
        alt="reminder editor screenshot"
        src="./assets/screenshot-reminder-editor.png"
      />
    </td>
  </tr>
  <tr>
    <td>
      <img
        alt="reminder list screenshot"
        src="./assets/screenshot-reminder-date-picker.png"
      />
    </td>
    <td>
      <img
        alt=""
        src="./assets/screenshot-reminder-list.png"
      />
    </td>
  </tr>
</table>

---

## Architecture Overview

While revisiting the [SOLID][solid] principles, I observed how there is a lack of attention given to dependency injection, and inversion of control in the majority of React projects. Props provide a way to inject dependencies, but make it very cumbersome to alter a dependency that is deep in a call stack:

```ts
const someFn = () => 'C'

// ComponentC depends on `someFn`
// which is injected through `props`
const ComponentC = (props = { someFn }) =>
  <div>{props.someFn()}</div>

// ComponentB depends on ComponentC,
// and if any parent of ComponentB
// wants to inject a different behavior
// for ComponentC, the `someFn` prop will
// need to be "drilled" down the call stack
const someFnB = () => 'B'

const ComponentB = (props = { someFn = someFnB }) =>
  <ComponentC someFn={props.someFn} />

const ComponentA1 = () =>
  <ComponentB />

const ComponentA2 = () =>
  <ComponentB someFn={() => 'A'}/>

// This is a simplified example, but a larger
// dependency tree would require a rewrite of
// multiple components drilling a few props
// needed for customization and reuse
```

An alternative to the "prop drilling" approach is to use React's context:

```ts
import { createContext, useContext } from 'react'

const SomeFnCtx = createContext(() => 'C')

// ComponentC depends on `someFn`
// which is now resolved through context
const ComponentC = () => {
  const someFn = useContext(SomeFnCtx)
  return <div>{someFn()}</div>
}

// ComponentB depends on ComponentC,
// but prevents prop drilling by injecting
// its custom `someFn` through context
const SomeFnBCtx = createContext(() => 'B')

const ComponentB = () => {
  const someFn = useContext(SomeFnBCtx)
  return (
    <SomeFnCtx.Provider value={someFn}>
      <ComponentC />
    </SomeFnCtx.Provider>
  )
}

// Parent components of ComponentB can
// optionally inject a different behavior
// to `someFn` by its SomeFnBCtx

const ComponentA1 = () =>
  <ComponentB />

const SomeFnACtx = createContext(() => 'A')

const ComponentA2 = () => {
  const someFn = useContext(SomeFnACtx)
  return (
    <SomeFnBCtx.Provider value={someFn}>
      <ComponentB />
    </SomeFnBCtx.Provider>
  )
}
```

My approach with this project was to use React's context for injection of all dependencies, including components, functions, atoms, e.t.c. I found that when reuse with customization is needed, there is less coupling with context injection. Here is a pseudo example comparing both solutions:

```ts
/**
 * Prop drilling:
 *  <ComponentA someProp={() => {}}>
 *    <ComponentB someProp={props.someProp}>
 *      <ComponentC someProp={props.someProp}>
 *        <ComponentD someProp={props.someProp}>
 *
 * Context injection:
 *  <SomePropCtx.Provider value={() => {}}>
 *    <ComponentA>
 *      <ComponentB>
 *        <ComponentC>
 *          <ComponentD>
 */
```

## Learnings

### Context vs Containers

I had great results using context to inject all dependencies, but found a limitation when trying to customize a function dependency:

```ts
// Given the following example functions:

const SumCtx = createContext(() => {
  return (x: number, y: number) => x + y
})

const FetchYCtx = createContext(() => {
  return () => localStorage.getItem('y')
})

const CalculateCtx = createContext(() => {
  const sum = useContext(SumCtx)()
  const fetchY = useContext(FetchYCtx)()
  return (x: number) => sum(x, fetchY())
})

// If other functions want to reuse calculate,
// but with a different definition for fetchY,
// the injection will require a custom component

const CustomFetchYCtx = createContext(() => {
  return () => 'some custom y value'
})

const WithCustomFetchY = (props) => {
  const useCustomFetchY = useContext(CustomFetchYCtx)
  return (
    <FetchYCtx.Provider value={useCustomFetchY}>
      {props.children}
    </FetchYCtx.Provider>
  )
}
```

My goal was then to have an isolated resolution flow for injected functions, having them not depend on a custom component for customizing their dependencies. This requirement led to the development of [virtual-elevators][virtual_elevators], and [rx-elevators][rx_elevators], projects which both implement an isolated container for resolving non-component dependencies, with an approach similar to:

```ts
const useSum = (container) => {
  return (x: number, y: number) => x + y
}

const useCalculate = (container) => {
  const fetchY = container.resolve(useFetchY)
  const sum = container.resolve(useSum)
  return (x: number) => sum(x, fetchY())
}

const useCustomFetchY = () => {
  return () => customStorage.getItem('y')
}

// Then, other functions, and components can use
// customCalculate without needing to inject custom
// dependencies through context providers

const useCustomCalculate = (container) => {
  const { childContainer } = container
  const customFetchY = container.resolve(useCustomFetchY)
  childContainer.register(useFetchY, customFetchY)
  return childContainer.resolve(useCalculate)
}

const ComponentA = () => {
  const container = useContext(ContainerCtx)
  const calculate = container.resolve(useCustomCalculate)
  const handleClick = () => calculate(10)
  return <>...</>
}
```

### Props vs Context

I spent some time thinking of when to use context vs props. It is possible to use any for all dependencies, but I found each to have its best case scenario, ending up with the following rules:

**Use props with values related to a component's instance, or that are expected to change for each component instance:**

```ts
// Rendering a list of values/components
items.map(item =>
  <ListItem item={item} key={item.id} />)
```

```ts
// Values that customize one/some instances
<Button type='primary' disabled={true} />
```

**Use context with values which are not expected to change for each component instance, but may be changed by parent components if necessary:**

```ts
const ComponentA = () => {
  const Button = useContext(HeaderCtx)
  const fetchValue = useContext(FetchValueCtx)
  return <Button onClick={fetchValue} />
}
```

[develop]: ../../.shared/node/README.md#development

[live_demo]: https://codesandbox.io/s/github/hd-o/coding-challenge/tree/main/packages/solid-calendar

[rx_elevators]: ../rx-elevators/README.md

[solid]: https://simple.wikipedia.org/wiki/SOLID_(object-oriented_design)

[virtual_elevators]: ../virtual-elevators/README.md
