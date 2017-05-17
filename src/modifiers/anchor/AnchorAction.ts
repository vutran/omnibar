import { AnchorItem } from './';

export default function AnchorAction(item: AnchorItem) {
    if (item.url) {
        window.location.href = item.url;
    }
}
