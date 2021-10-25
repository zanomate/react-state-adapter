# react-state-adapter

[![npm (scoped)](https://img.shields.io/npm/v/react-state-adapter?style=flat-square)](https://www.npmjs.com/package/react-state-adapter)
[![npm type definitions](https://img.shields.io/npm/types/react-state-adapter)](https://www.npmjs.com/package/typescript)
[![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/react-state-adapter/peer/react)](https://www.npmjs.com/package/react)

A React hook to shape your components states.

```js
import use from 'react-state-adapter'

const MyComponent = () => {
  const myDialog = use(asDialog)(false)

  return (
    <>
      <MyDialog
        open={myDialog.isOpen}
        onClose={myDialog.close}
      />
      <button onClick={myDialog.open}>open</button>
    </>
  )
}

const asDialog = (value = false, set) => ({
  isOpen: value,
  open: () => set(true),
  close: () => set(false),
  toggle: () => set(prev => !prev)
})
```

## Install

Install via NPM:

```
npm i react-state-adapter
```

or Yarn:

```
yarn add react-state-adapter
```

## Usage

### Create your adapters

An adapter is simply a function that takes:

- The primitive `value` of the state
- The function to `set` a new value

and returns a more complex object, that can contains:

- derived properties
- custom methods

#### Example:

I want to shape a state around the "theme mode", that in my application is of type string; possible values for the state
are `light` nd`dark`.

```js
const asThemeMode = (mode = 'light', set) => ({
  mode,
  isDark: mode === 'dark',
  toggle: () => {
    set(mode === 'light' ? 'dark' : 'light')
  }
})
```

I wrote an adapter that takes the primitive string value, and returns:

- a derived property `isDark` that explicitly transform the state into a more specific boolean information.
- a custom method `toggle` that I can use to easily switch between the two string states.
- the string state itself, named `mode`.

### Use adapters in components with `use` hook

Import the `use` custom hook from the library:

```js
import use from 'react-state-adapter'
```

and declare a new state specifying the adapter to use.

```js
const themeMode = use(asThemeMode)()
```

Eventually you can pass an initial value to override the one in your adapter:

```js
const themeMode = use(asThemeMode)('theme')
```

Now, you can access all the previously defined properties.

```js
<span>{themeMode.mode}</span> // 'light'
<span>{themeMode.isDark}</span> // false
```

or use the custom methods:

```js
<button onClick={themeMode.toggle}>click</button>
```

#### Basic properties

Additionally, the `use` method will provide to your resulting state object:

- a property named `value` that contains the value of the underlying state.
- a method named `set` to directly set the value of the underlying state.

#### Define custom hooks

You can easily define your own custom hooks by simply passing the adapter to the `use` method:

```js
const useThemeMode = use(asThemeMode)
```

or defining the adapter directly inside it:

```js
const useThemeMode = use((value, set) => ({ ... }))
```

## Typescript

Use it with Typescript too:

```tsx
import use, { Adapter, AdapterHook } from 'react-state-adapter'

interface ThemeMode {
  mode: string
  isDark: boolean
  toggle: () => void
}

const asThemeMode: Adapter<string, ThemeMode> = (
  (mode = 'light', set) => ({
    mode,
    isDark: mode === 'dark',
    toggle: () => {
      set(mode === 'light' ? 'dark' : 'light')
    }
  })
)

const useThemeMode: AdapterHook<string, ThemeMode> = (
  use<string, ThemeMode>(asThemeMode)
)

const MyComponent = () => {
  const themeMode: ThemeMode = useThemeMode('dark')

  return (
    <>
      <span>{themeMode.mode} < /span>
      <button onClick={themeMode.toggle} />
    </>
  )
}
```
