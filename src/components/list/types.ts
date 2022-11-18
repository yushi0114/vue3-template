import type { PlainOption } from '@/types';

export type ListOperatorOption<T = any> = PlainOption<T> & {
    icon?: string,
    disabled?: boolean
}
