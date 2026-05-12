import type { TransactionDto } from "../types/Transaction";
import api from "../services/api";
import type { ResponseVM } from "../types/ResponseVM";

export const transactionController = {
    getAllTransactions: async () => await api.get<ResponseVM<TransactionDto[]>, ResponseVM<TransactionDto[]>>('Api/Transactions'),
    getTransactionsByUserId: async (userId: number) => await api.get<ResponseVM<TransactionDto[]>, ResponseVM<TransactionDto[]>, number>(`Api/Transactions/${userId}`),
    postTransaction: async (transaction: TransactionDto) => await api.post<ResponseVM<TransactionDto>, ResponseVM<TransactionDto>, TransactionDto>(`Api/Transactions`, transaction)
}; 

export default transactionController;