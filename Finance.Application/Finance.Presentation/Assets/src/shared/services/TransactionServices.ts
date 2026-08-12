import TransactionController from '../controllers/TransactionController';
import type { TransactionDto } from "../types/Transaction";
import { evaluateNulls } from '../utils/helpers/evaluateNulls.ts/helpers';
import type { GetTransactionsParams } from '../types/TransactionParameters';
import type { CleanControllerResponse } from '../types/CleanControllerResponse';
import { data } from 'react-router-dom';

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
    getTransactionByUserId: async ({userId, pageSize, fromDate, untilDate, cursor}: GetTransactionsParams): Promise<CleanControllerResponse<TransactionDto[]>> => {
        try {
            console.log('cursor en service ', cursor)
            if (!userId)
                throw new Error("ID de usuario no proporcionado o inválido.");
            
            const verifiedUserId = userId;
            const parsedPagedSize = pageSize?.toString() ?? 10;
            let requestBuilder = `${verifiedUserId}?pageSize=${parsedPagedSize}`;

            if (fromDate){
                requestBuilder = requestBuilder + `&fromDate=${fromDate}`
            }

            if (untilDate){
                requestBuilder = requestBuilder + `&untilDate=${untilDate}`
            }

            if(cursor){
                requestBuilder = requestBuilder + `&nextCursor=${cursor}`
            }
            console.log(requestBuilder)
            const pagedResponseData = (await TransactionController.getTransactionsByUserId(requestBuilder)).data;
            
            const payload = {
                data: pagedResponseData?.items ?? [],
                hasNextPage: pagedResponseData?.hasNextPage ?? false,
                nextCursor: pagedResponseData?.nextCursor ?? ""
            }
            console.log('payload returned by service', payload)
            return payload

        }
        catch (error) {
            throw new Error("Hubo un error al cargar tus datos. Intenta de nuevo mas tarde.");
        }
    },
    postTransaction: async (transaction: TransactionDto | null): Promise<TransactionDto> => {
        try {
            if(!transaction)
                throw new Error("Transaccion no valida");
            if(transaction.category !== "Income" && transaction.category !== "Outcome")
                throw new Error("Categoria de transaccion no valida");
            if(transaction.description.length > 500)
                throw new Error("La descripcion no puede ser mayor a 500 caracteres");
            if(transaction.amount <= 0)
                throw new Error("No se puede agregar una cantidad menor a 0");
            
            const transactionControllerResult = (await TransactionController.postTransaction(transaction)).data;
            
            return evaluateNulls(transactionControllerResult);
        }
        catch (error) {
            throw new Error("Hubo un error al subir tus datos. Intenta de nuevo mas tarde.");
        }
    }
}