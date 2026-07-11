import {useEffect, useState } from "react"
import { TransactionService } from "../services/TransactionServices";
import type { TransactionDto } from "../types/Transaction";

export const useTransactions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionDto[]>([]);
    const [error, setError] = useState<unknown>(null);

    const loading = async () => {
        try{
            setIsLoading(true);
            const data = await TransactionService.getTransactions();
            setTransactions(data);
        }
        catch (error: unknown) {
            setError(error)
        } 
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loading();
    }, [])

    return {isLoading, transactions, error}
}

export const useGetTransactionsByUserId = (userId: number | null, fromDate?: string, untilDate?: string) => {
    const [isLoadingGetUserById, setIsLoadingGetUserById] = useState(false);
    const [transactionsGetUserById, setTransactionGetUserById] = useState<TransactionDto[] | null>(null);
    const [errorGetUserById, setErrorGetUserById] = useState<unknown>(null);

    const getByIdGetUserById = async () => {
        try {
            setIsLoadingGetUserById(true);
            if (!fromDate || !untilDate){
                const data = await TransactionService.getTransactionByUserId(userId);
                setTransactionGetUserById(data);
            }
            else{
                const data = await TransactionService.getTransactionByUserId(userId, fromDate, untilDate);
                setTransactionGetUserById(data);
            }        
        }
        catch (error: unknown) {
            setErrorGetUserById(error);
        } 
        finally {
            setIsLoadingGetUserById(false);
        }
    }

    useEffect(() => {
        if (!userId)
            return;
        getByIdGetUserById();
    }, [userId]);

    return { 
        isLoadingGetUserById, 
        transactionsGetUserById, 
        errorGetUserById 
    };
};

export const usePostTransaction = (transaction: TransactionDto | null) => {
    const [isLoadingPostTransaction, setIsLoadingPostTransaction] = useState(false);
    const [transactionPost, setTransactionPost] = useState<TransactionDto | null>(null);
    const [errorPostTransaction, setErrorPostTransaction] = useState<unknown>(null);

    const postTransaction = async () => {
        try {
            setIsLoadingPostTransaction(true);
            const newTransaction = await TransactionService.postTransaction(transaction);
            setTransactionPost(newTransaction);
        }
        catch (error: unknown) {
            setErrorPostTransaction(error);
        } 
        finally {
            setIsLoadingPostTransaction(false);
        }
    }

    useEffect(() => {
        if (!transaction)
            return;
        postTransaction();
    }, [transaction]);

    return {
        isLoadingPostTransaction,
        transactionPost,
        errorPostTransaction
    }
}