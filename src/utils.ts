/**
 * Flatten a list of lists
 *
 * @param {Array<Array<T>>} lists
 * @return {Array<T>}
 */
export function flatten<T>(list: Array<Array<T>>): Array<T> {
    return list.reduce((prev: Array<T>, next: Array<T>): Array<T> => {
        return prev.concat(next);
    }, []);
}

/**
 * Prevent a function from being called multiple times
 * repeatedly within a short time frame.
 *
 * @param {Function} fn
 * @param {number} wait
 * @return {Function}
 */
export function debounce(fn: any, wait: number): any {
    let timeout: NodeJS.Timer = null;
    return (...args: Array<any>) => {
        const ctx = this;
        const later = () => {
            timeout = null;
            fn.apply(ctx, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
