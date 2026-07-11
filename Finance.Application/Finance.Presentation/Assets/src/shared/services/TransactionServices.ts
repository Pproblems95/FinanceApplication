import TransactionController from '../controllers/TransactionController';
import type { TransactionDto } from "../types/Transaction";
import { evaluateNulls } from '../utils/helpers/evaluateNulls.ts/helpers';

export const TransactionService = {
    getTransactions: async (): Promise<TransactionDto[]> => {
        try {
            const data = (await TransactionController.getAllTransactions()).data;
            
            return evaluateNulls(data);
        }
        catch (error) {
            throw new Error("Hubo un error al cargar tus datos. Intenta de nuevo mas tarde.");
        }
    },
    getTransactionByUserId: async (userId: number | null, fromDate?: string, untilDate?: string): Promise<TransactionDto[]> => {
        try {
            if (!userId)
                throw new Error("ID de usuario no proporcionado o inválido.");
            
            const verifiedUserId = userId;
            if (!fromDate || !untilDate){
                const stringForApiCall = `${verifiedUserId}`
                const data = (await TransactionController.getTransactionsByUserId(stringForApiCall)).data;
                return evaluateNulls(data);
            }
            else{
                const stringForApiCall = `${verifiedUserId}?fromDate=${fromDate}&untilDate=${untilDate}`
                const data = (await TransactionController.getTransactionsByUserId(stringForApiCall)).data;
                return evaluateNulls(data);
            }
        }
        catch (error) {
            throw new Error("Hubo un error al cargar tus datos. Intenta de nuevo mas tarde.");
        }
    },
    postTransaction: async (transaction: TransactionDto | null): Promise<TransactionDto> => {
        try {
            if(!transaction)
                throw new Error("Transaccion no valida");
            if(transaction.Category !== "Income" && transaction.Category !== "Outcome")
                throw new Error("Categoria de transaccion no valida");
            if(transaction.Description.length > 500)
                throw new Error("La descripcion no puede ser mayor a 500 caracteres");
            if(transaction.Amount <= 0)
                throw new Error("No se puede agregar una cantidad menor a 0");
            
            const transactionControllerResult = (await TransactionController.postTransaction(transaction)).data;
            
            return evaluateNulls(transactionControllerResult);
        }
        catch (error) {
            throw new Error("Hubo un error al subir tus datos. Intenta de nuevo mas tarde.");
        }
    }
}