import { ResultItem } from '../../typings';

export default function AnchorAction(item: ResultItem) {
    if (item.url) {
        window.location.href = item.url;
    }
}
