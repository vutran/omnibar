import { Results } from '../../../typings';
import { fetch } from '../utils';

interface NpmItem {
    package: {
        name: string;
        scope: string;
        version: string;
        description: string;
        links: {
            npm: string;
            homepage: string;
            repository: string;
            bugs: string;
        };
        author: {
            name: string;
            email: string;
        };
        publisher: {
            username: string;
            email: string;
        };
        maintainers: Array<{
            username: string;
            email: string;
        }>;
    };
}

type NpmResponse = Array<NpmItem>;

const FETCH_CACHE: { [id: string]: Promise<NpmResponse> } = {};

const URL = 'https://api.npms.io/v2/search/suggestions';

/**
 * Demo extension that returns a Promise which resolves a list of `ResultItem`.
 * The user's original `query` is passed in the function's argument which is
 * passed to the 3rd-party API.
 *
 * @param {string} query
 * @param {Results}
 */
export default function NpmSearchExtension(query: string): Results {
    // retrieves from cache makes a new fetch request (and cache)
    const prom = FETCH_CACHE[query] || (
        FETCH_CACHE[query] = fetch<NpmResponse>(`${URL}?q=${query}&size=10`)
    );

    return prom
        .then(packages => packages.map(
            item => ({
                title: item.package.name,
                subtitle: item.package.links.npm,
            }),
        ));
}
