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
    }

    useEffect(() => {
        loading();
    }, [])

    return {isLoading, transactions, error}
}

export default useTransactions