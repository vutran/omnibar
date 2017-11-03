import { flatten } from './utils';

/**
 * Does a search for the given `query` against the list of `extensions`
 * and returns a Promise that results into a list of `ResultItem`.
 *
 * @param {string} query
 * @param {Array<Extension>} extension
 * @return {Promise<Array<T>>}
 */
export default function search<T>(
  query: string,
  extensions: Array<Omnibar.Extension<T>>
): Promise<Array<T>> {
  const results: Array<Omnibar.Results<T>> = [];

  // iterate through all extensions and compile them into `results` list
  for (let extension of extensions) {
    if (typeof extension === 'function') {
      results.push(extension.call(null, query));
    }
  }

  return Promise.all(results).then(groups => flatten<T>(groups));
}
