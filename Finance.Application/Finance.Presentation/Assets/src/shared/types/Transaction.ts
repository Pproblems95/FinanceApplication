export interface TransactionDto {
    id: number,
    userId: number,
    amount: number,
    date: string,
    description: string,
    category: string,
    // 0 = Constant, 1 = Variable
    transactionType: number,
    createdAt: string
}