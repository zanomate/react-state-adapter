import { Dispatch, SetStateAction } from 'react';
export declare type ReactState<T> = T | undefined;
export declare type ReactSetState<T> = Dispatch<SetStateAction<T | undefined>>;
export interface BasicAdaptedState<T> {
    value: ReactState<T>;
    set: ReactSetState<T>;
}
export declare type Adapter<T, S> = (value: ReactState<T>, set: ReactSetState<T>) => S;
export declare type AdapterHook<T, S> = (initialValue?: T) => S & BasicAdaptedState<T>;
declare const use: <T, S>(adapter?: Adapter<T, S>) => AdapterHook<T, S>;
export default use;
