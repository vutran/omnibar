export default `
import math from 'mathjs';

export default function MathExtension(query) {
    try {
        const answer = math.eval(query);
        return [
            {
                title: answer.toString(),
                subtitle: 'Calculate: ' + query,
            },
        ];
    } catch (err) {
        return [];
    }
}
`;
