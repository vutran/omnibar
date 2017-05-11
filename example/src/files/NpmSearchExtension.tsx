export default `
import fetch from 'unfetch';

const URL = 'https://api.npms.io/v2/search/suggestions';

export default function NpmSearchExtension(query) {
    const prom = fetch(\`\${URL}?q=\${query}&size=10\`);

    return prom
        .then(packages => packages.map(
            item => ({
                title: item.package.name,
                subtitle: item.package.links.npm,
            }),
        ));
}
`;
