import type { PlainOption } from './util';

export interface DynamicNavEntity extends PlainOption<string> {
    id: string,
    pid?: DynamicNavEntity['id'],
    children?: DynamicNavEntity[]
}
