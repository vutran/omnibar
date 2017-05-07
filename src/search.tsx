import { Extension, ResultItem } from '../typings';
import { flatten } from './utils';

const REGEX_CACHE: { [query: string]: RegExp } = {};

/**
 * Does a search for the given `query` against the list of `extensions`
 * and returns a Promise that results into a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<Extension>} extension
 * @return {Promise<Array<ResultItem>>}
 */
export default function search(query: string, extensions: Array<Extension>): Promise<Array<ResultItem>> {
    const results: Array<Array<ResultItem>> = [];

    // lookup for the cached regex instance
    // or create a new one
    const rgx = REGEX_CACHE[query] || (REGEX_CACHE[query] = new RegExp(query, 'i'));

    // iterate through all extensions and compile them into `results` list
    for (let extension of extensions) {
        if (typeof extension === 'function') {
            results.push(extension.call(null, query));
        }
    }

    return Promise.all(results)
        .then(groups => flatten<ResultItem>(groups))
        .then(results => results.filter(item => rgx.test(item.title)));
}
