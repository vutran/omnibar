import { Extension, Results, ResultItem } from '../typings';
import { flatten } from './utils';

/**
 * Does a search for the given `query` against the list of `extensions`
 * and returns a Promise that results into a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<Extension>} extension
 * @return {Promise<Array<ResultItem>>}
 */
export default function search(query: string, extensions: Array<Extension>): Promise<Array<ResultItem>> {
    const results: Array<Results> = [];

    // iterate through all extensions and compile them into `results` list
    for (let extension of extensions) {
        if (typeof extension === 'function') {
            results.push(extension.call(null, query));
        }
    }

    return Promise.all(results)
        .then(groups => flatten<ResultItem>(groups));
}
