export interface ResultItem {
    title: string;
    url: string;
}

// Extensions
export type FunctionalExtension = (query: string) => Array<ResultItem>;
export type Extension = FunctionalExtension;
