import math from 'mathjs';
import { Results } from '../../../typings';

/**
 * Calculate and return anything.
 *
 * @param {string} query
 * @param {Array<ResultItem>}
 */
export default function MathExtension(query: string): Results {
    try {
        const answer = math.eval(query);
        return [
            {
                title: answer.toString(),
            },
        ];
    } catch (err) {
        return [];
    }
}
