export function equal(
    f: undefined | ((a: any, b: any) => boolean),
    a: any,
    b: any
) {
    return isFunction(f) ? f!(a, b) : Object.is(a, b);
}


export const is: <T = any>(a: T, b: T) => boolean = curry(equal, Object.is);
export const not: <T = any>(a: T, b: T) => boolean = curry(equal, function([v1, v2]: [any, any]) {
    return !Object.is.apply(null, [v1, v2]);
});

export function deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    const isObjectA = isObject(a);
    const isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
        try {
            const isArrayA = Array.isArray(a);
            const isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
                return a.length === b.length && a.every((e: any, i: number) => {
                    return deepEqual(e, b[i]);
                });
            } else if (a instanceof Date && b instanceof Date) {
                return a.getTime() === b.getTime();
            } else if (!isArrayA && !isArrayB) {
                const keysA = Object.keys(a);
                const keysB = Object.keys(b);
                return keysA.length === keysB.length && keysA.every(key => {
                    return deepEqual(a[key], b[key]);
                });
            }

            return false;

        } catch (e) {
            return false;
        }
    } else if (!isObjectA && !isObjectB) {
        return String(a) === String(b);
    }

    return false;
}

/* eslint-disable */
export const noop = (..._: any[]) => { };
export const no = (..._: any[]) => false;
/* eslint-enable */

export const identity = <T = any>(value: T) => value;

export function curry(fn: Function, ...args: any[]) {
    return (..._args: any[]) =>
        (rest => rest.length >= fn.length
            ? fn(...rest)
            : curry(fn, rest)
        )([...args, ..._args]);
}

const _toString = Object.prototype.toString;

export function toRawType(value: any): string {
    return _toString.call(value).slice(8, -1);
}

export function isDefind(o: any): boolean {
    return o !== undefined && o !== null;
}

export function isObject(o: any): boolean {
    return o !== null && typeof o === 'object';
}

export function isPlainObject(o: any): boolean {
    return isDefind(o) && !isPrimitive(o);
}

export const isString = (o: any) => typeof o === 'string';
// NaN
export const isNumber = (o: any) => toRawType(o) === 'Number';
export const isSymbol = (o: any) => typeof o === 'symbol';
export const isBoolean = (o: any) => typeof o === 'boolean';
export const isFunction = (o: any) => typeof o === 'function';

export const isArrayBuffer = (o: any) => toRawType(o) === 'ArrayBuffer';

export const isRegExp = (o: any) => toRawType(o) === 'RegExp';

export const isNumberLike = (o: any) => isNumber(Number(o));


export function isPrimitive(o: any): boolean {
    return isString(o) || isNumber(o) || isSymbol(o) || isBoolean(o);
}

export function isPromise(o: any): boolean {
    return isDefind(o) && isFunction(o.then) && isFunction(o.catch);
}

export function isIE(): boolean {
    return !!(window as any).ActiveXObject || 'ActiveXObject' in window;
}

export function isFalsy(o: any): boolean {
    return !isDefind(o) || ['', 0, false, NaN,/* 0n */].includes(o);
}

export function isTruthy(o: any): boolean {
    return !isFalsy(o);
}


export function isEmptyArray(o: any): boolean {
    return Array.isArray(o) ? o.length === 0 : false;
}

export function isEmptyPlainObject(o: any): boolean {
    return isPlainObject(o) ? Object.keys(o).length === 0 : false;
}
