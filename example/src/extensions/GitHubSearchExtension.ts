import { Results } from '../../../typings';
import { fetch } from '../utils';

interface GitHubItem {
    id: number;
    full_name: string;
    html_url: string;
    description: string;
}

interface GitHubResponse {
    total_count: number;
    incomplete_results: boolean;
    items: Array<GitHubItem>;
};

const FETCH_CACHE: { [id: string]: Promise<GitHubResponse> } = {};

/**
 * Demo extension that returns a Promise which resolves a list of `ResultItem`.
 * The user's original `query` is passed in the function's argument which is
 * passed to the 3rd-party API.
 *
 * @param {string} query
 * @param {Results}
 */
export default function GitHubSearchExtension(query: string): Results {
    const options = {
        headers: {
            Accept: 'application/vnd.github.vutran-omnibar+json',
        },
        params: {
            q: query,
        },
    };

    // retrieves from cache makes a new fetch request (and cache)
    const prom = FETCH_CACHE[query] || (
        FETCH_CACHE[query] = fetch<GitHubResponse>(
            'https://api.github.com/search/repositories',
            options,
        )
    );

    return prom
        .then(resp => resp.items)
        .then(items => items.map(item => ({
            title: item.full_name,
            url: item.html_url,
        })));
}
