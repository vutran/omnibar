export default `
import fetch from 'unfetch';

export default function GitHubSearchExtension(query) {
    const options = {
        headers: {
            Accept: 'application/vnd.github.vutran-omnibar+json',
        },
    };

    const prom = fetch(\`https://api.github.com/search/repositories?q=\${query}\`, options);

    return prom
        .then(resp => resp.items.map(
            item => ({
                title: item.full_name,
                subtitle: item.html_url,
                image: item.owner.avatar_url,
                url: item.html_url,
            }),
        ));
}
`;
