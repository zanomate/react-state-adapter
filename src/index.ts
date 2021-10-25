import { Dispatch, SetStateAction, useState } from 'react'

export type ReactState<T> = T | undefined
export type ReactSetState<T> = Dispatch<SetStateAction<T | undefined>>

export interface BasicAdaptedState<T> {
  value: ReactState<T>
  set: ReactSetState<T>
}

export type Adapter<T, S> = (value: ReactState<T>, set: ReactSetState<T>) => S

export type AdapterHook<T, S> = (initialValue?: T) => S & BasicAdaptedState<T>

const use = <T, S>(adapter?: Adapter<T, S>): AdapterHook<T, S> => (
  (initialValue?) => {
    const [state, setState] = useState<T>(initialValue)
    const baseAttributes: BasicAdaptedState<T> = {
      value: state,
      set: setState,
    }
    const otherAttributes: S = adapter(state, setState)
    return {
      ...baseAttributes,
      ...otherAttributes
    }
  }
)

export default use
