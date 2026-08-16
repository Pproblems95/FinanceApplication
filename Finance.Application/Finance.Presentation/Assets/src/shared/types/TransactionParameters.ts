export interface GetTransactionsParams {
    userId: number | null;
    pageSize?: number;
    fromDate?: string;
    untilDate?: string;
    cursor?: string | null;
}