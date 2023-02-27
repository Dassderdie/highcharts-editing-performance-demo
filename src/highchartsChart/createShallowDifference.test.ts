import { cloneDeep } from 'lodash-es';
import { createShallowDifference } from './createShallowDifference';

test('handels objects with no changes', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(createShallowDifference(obj, obj)).toEqual({});
    expect(createShallowDifference(obj, cloneDeep(obj))).toEqual({});
});

test('handels added properties', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB1 = { ...objA, d: 4 };
    expect(createShallowDifference(objA, objB1)).toEqual({ d: 4 });
    const objB2 = { ...objA, d: 4, e: 5, f: 6 };
    expect(createShallowDifference(objA, objB2)).toEqual({ d: 4, e: 5, f: 6 });
});

test('handels removed properties', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB1 = { a: 1, b: 2 };
    expect(createShallowDifference(objA, objB1)).toEqual({ c: undefined });
    const objB2 = { a: 1 };
    expect(createShallowDifference(objA, objB2)).toEqual({
        b: undefined,
        c: undefined,
    });
});

test('handels changed properties', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB1 = { a: 1, b: 2, c: 4 };
    expect(createShallowDifference(objA, objB1)).toEqual({ c: 4 });
    const objB2 = { a: 1, b: 2, c: '4' };
    expect(createShallowDifference<any>(objA, objB2)).toEqual({ c: '4' });
});

test('supports nullish properties', () => {
    const objA = { a: 1, b: 2, c: undefined };
    const objB1 = { a: 1, b: 2, c: 4 };
    expect(createShallowDifference<any>(objA, objB1)).toEqual({ c: 4 });
    const objB2 = { a: 1, b: 2, c: undefined };
    expect(createShallowDifference<any>(objA, objB2)).toEqual({});
    const objB3 = { a: 1, b: 2, c: null };
    expect(createShallowDifference<any>(objA, objB3)).toEqual({ c: null });
});

test('supports changes in nested objects', () => {
    const objA = { a: 1, b: { c: 3, d: 4 } };
    expect(createShallowDifference<any>(objA, objA)).toEqual({});
    expect(createShallowDifference<any>(objA, cloneDeep(objA))).toEqual({});
    const objB2 = { a: 1, b: { c: 3 } };
    // Only compare the first level of the object (shallow)
    expect(createShallowDifference<any>(objA, objB2)).toEqual({ b: { c: 3 } });
    const objB3 = { a: 1, b: { c: 3 } };
    expect(createShallowDifference<any>(objA, objB3)).toEqual({ b: { c: 3 } });
    const objB4 = { a: 1, b: { c: 3, d: 3 } };
    expect(createShallowDifference<any>(objA, objB4)).toEqual({
        b: { c: 3, d: 3 },
    });
});

test('preserves cyclic objects', () => {
    const objA = { a: {} /* objA */ };
    objA.a = objA;
    expect(createShallowDifference<any>(objA, objA)).toEqual({});
    expect(createShallowDifference<any>(objA, cloneDeep(objA))).toEqual({});
    const objB1 = { a: {} /* objB1 */ };
    objB1.a = objB1;
    expect(createShallowDifference<any>(objA, objB1)).toEqual({});
    const objB2 = {
        a: {} /* objB2 */,
        b: 1,
    };
    objB2.a = objB2;
    expect(createShallowDifference<any>(objA, objB2)).toEqual({
        a: objB2,
        b: 1,
    });
});

test('handels multiple changed properties', () => {
    const objA = { a: 1, b: 2, c: 3 };
    const objB2 = { a: 1, b: 3, c: 4 };
    expect(createShallowDifference<any>(objA, objB2)).toEqual({ b: 3, c: 4 });
    const objB3 = { d: 1, e: 3, f: 4 };
    expect(createShallowDifference<any>(objA, objB3)).toEqual({
        a: undefined,
        b: undefined,
        c: undefined,
        d: 1,
        e: 3,
        f: 4,
    });
});

test('handels a complex case', () => {
    const objA = {
        a: 1,
        b: { c: 'a', d: [1], e: { f: null, g: 'z', h: true } },
    };
    const objB1 = {
        b: { c: 'a', d: [1], e: { f: null, g: 'z', h: false } },
        c: 'a',
    };
    expect(createShallowDifference<any>(objA, objB1)).toEqual({
        a: undefined,
        b: { c: 'a', d: [1], e: { f: null, g: 'z', h: false } },
        c: 'a',
    });
});
