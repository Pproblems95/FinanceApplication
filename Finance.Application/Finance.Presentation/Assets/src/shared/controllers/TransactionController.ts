import type { TransactionDto } from "../types/Transaction";
import api from "../services/api";
import type { ResponseVM } from "../types/ResponseVM";
import type { PagedResponse } from "../types/PagedResponse";

export const transactionController = {
    getAllTransactions: async () => await api.get<ResponseVM<TransactionDto[]>, ResponseVM<TransactionDto[]>>('Api/Transactions'),
    getTransactionsByUserId: async (request: string) => await api.get<PagedResponse<TransactionDto[]>, ResponseVM<PagedResponse<TransactionDto[]>>>(`Api/Transactions/${request}`),
    postTransaction: async (transaction: TransactionDto) => await api.post<ResponseVM<TransactionDto>, ResponseVM<TransactionDto>, TransactionDto>(`Api/Transactions`, transaction)
}; 
export default transactionController;