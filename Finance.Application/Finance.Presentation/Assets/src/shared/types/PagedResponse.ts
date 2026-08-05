export interface PagedResponse<T> {
    items: T,
    pageSize: number,
    nextCursor?: string
    hasNextPage: boolean
};