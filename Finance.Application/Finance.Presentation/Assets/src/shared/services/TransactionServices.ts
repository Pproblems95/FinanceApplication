import TransactionController from '../controllers/TransactionController';
import type { TransactionDto } from "../types/Transaction";

export const TransactionService = {
    getTransactions: async (): Promise<TransactionDto[]> => {
        try {
            const data = await TransactionController.getAllTransactions();
            return data;
        }
        catch (error) {
            throw new Error("Hubo un error al cargar tus datos. Intenta de nuevo mas tarde.");
        }
    }
}