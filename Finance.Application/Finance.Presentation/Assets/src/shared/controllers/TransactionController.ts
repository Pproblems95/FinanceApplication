import axios from "axios";
import type { TransactionDto } from "../types/Transaction";
import api from "../services/api";

export const transactionController = {
    getAllTransactions: async () => await api.get<any, TransactionDto[]>('Api/Transactions')
};

export default transactionController;