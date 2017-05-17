import math from 'mathjs';

/**
 * Calculate and return anything.
 *
 * @param {string} query
 * @param {Array<any>}
 */
export default function MathExtension(query: string): Array<any> {
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
