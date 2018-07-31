import { KeyValuePair } from './key-value-pair';

export interface Make{
    id: number,
    name: string,
    models: KeyValuePair[]
}