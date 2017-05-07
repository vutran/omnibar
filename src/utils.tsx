/**
 * Flatten a list of lists
 *
 * @param {Array<Array<T>>} lists
 * @return {Array<T>}
 */
export function flatten<T>(list: Array<Array<T>>): Array<T> {
    return list.reduce(
        (prev: Array<T>, next: Array<T>): Array<T> => {
            return prev.concat(next);
        },
        [],
    );
}
