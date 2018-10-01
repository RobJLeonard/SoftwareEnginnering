/**
 * Function signature for comparing
 * <0 means a is smaller
 * = 0 means they are equal
 * >0 means a is larger
 */
export interface ICompareFunction<T> {
    (a: T, b: T): number;
}

/**
 * Function signature for checking equality
 */
export interface IEqualsFunction<T> {
    (a: T, b: T): boolean;
}

/**
 * Function signature for Iterations. Return false to break from loop
 */
export interface ILoopFunction<T> {
    (a: T): boolean | void;
}

/**
 * Default function to compare element order.
 * @function
 */
export function defaultCompare<T>(a: T, b: T): number {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else {
        return 1;
    }
}

/**
 * Checks if the given argument is undefined.
 * @function
 */
export function isUndefined(obj: any): obj is undefined {
    return (typeof obj) === 'undefined';
}
