import { Results } from '../../../typings';

const REGEX_CACHE: { [query: string]: RegExp } = {};

/**
 * At the very basic level, an extension can just be a regular function
 * that takes a `query` and returns a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<ResultItem>}
 */
export default function BasicDemoExtension(query: string): Results {
    // lookup for the cached regex instance
    // or create a new one
    const rgx = REGEX_CACHE[query] || (REGEX_CACHE[query] = new RegExp(query, 'i'));

    const items = [
        { title: 'GitHub', url: 'https://github.com' },
        { title: 'Google', url: 'https://google.com' },
        { title: 'Twitter', url: 'https://twitter.com' },
    ];

    return items.filter(item => rgx.test(item.title));
}
