import { ResultItem } from '../../../typings';

/**
 * At the very basic level, an extension can just be a regular function
 * that takes a `query` and returns a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<ResultItem>}
 */
export default function(query: string): Array<ResultItem> {
    return [
        { title: 'GitHub', url: 'https://github.com' },
        { title: 'Google', url: 'https://google.com' },
        { title: 'Twitter', url: 'https://twitter.com' },
    ];
}
