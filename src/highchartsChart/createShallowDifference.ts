import { isEqual } from 'lodash-es';

/**
 * Creates an object that contains only the properties that have been changed
 * when going from {@link previousObject} to {@link currentObject}.
 *
 * Only shallow by-value comparisons are done.
 * There is no distinction made between an `undefined` and an nonexistent property (no key).
 */
export function createShallowDifference<
    T extends Partial<{ [key: string]: any | undefined }>
>(previousObject: T, currentObject: T): T {
    const differenceObject = {} as T;
    if (previousObject === currentObject) {
        return differenceObject;
    }
    // All keys that have been removed from previousObject
    for (const key of Object.keys(previousObject) as (keyof T)[]) {
        if (
            currentObject[key] === undefined &&
            previousObject[key] !== undefined
        ) {
            differenceObject[key] = undefined as any;
        }
    }
    // All keys that have been added to currentObject or have been changed
    for (const key of Object.keys(currentObject) as (keyof T)[]) {
        // IsEqual already deals with all special cases, like NaN, RegExp, Function, etc.
        if (!isEqual(currentObject[key], previousObject[key])) {
            differenceObject[key] = currentObject[key];
        }
    }
    return differenceObject;
}
