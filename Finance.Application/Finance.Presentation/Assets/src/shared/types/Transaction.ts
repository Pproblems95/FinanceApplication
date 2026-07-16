export interface TransactionDto {
    id: number;
    userId: number;
    amount: number;
    date: string;
    description: string;
    category: string;
}