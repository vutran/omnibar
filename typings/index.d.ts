export interface ResultItem {
    title: string;
    url?: string;
}

// Result set
type ListResult = Array<ResultItem | any>;
type ResolvedResult = Promise<ListResult | any>;
type Results = ListResult | ResolvedResult;

// Extensions
export type FunctionalExtension = (query: string) => Results;
export type Extension = FunctionalExtension;
