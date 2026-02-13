import TransactionFooter from "./TransactionFooter";
import TransactionForm from "./TransactionForm";
import TransactionHeader from "./TransactionHeader";
import {getAllTransactions,getAllTransactionById,deleteTransactionById,addTransaction,saveTransaction} from "../Services/TransactionAPI";

import type { Transaction } from "../Models/Transaction";
import type { TransactionSummary } from "../Models/TransactionSummary";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionRows from "./TransactionRows";
export default function Statement() {
    const [Transactions, setTransaction] = useState<Transaction[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [TransactionSummary, setTransactionSummary] = useState<TransactionSummary>({
        totalCredit: 0,
        totalDebit: 0,
        balance: 0
    })

    useEffect(()=>{
        getAllTransactions()
        .then(response =>{ setTransaction(response.data)
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error);
            setErrorMsg("unable to fetch data")
        })
    },[])
   // Sum of the colume of credit and debit column
   useEffect(()=>{
     if(Transactions && Transactions.length > 0){
        const sumOfColumn = (transaction : Transaction[], target : string) =>transaction.filter(t =>t.transactionType  === target)
        .map(t=>t.amount).reduce((a1:any,a2:any)=>a1+a2,0);

        const creditSum = sumOfColumn(Transactions,"CREDIT");
        const debitSum = sumOfColumn(Transactions,"DEBIT");
        setTransactionSummary({totalCredit : creditSum,totalDebit:debitSum,balance : creditSum - debitSum})
     }else{
        setTransactionSummary({totalCredit : 0,totalDebit:0,balance : 0})
     }
   },[Transactions])

   /// Add row 
   const add = (transaction: Transaction) => {
    addTransaction(transaction)
        .then(response => setTransaction([...transaction, { ...response.data }]))
        .catch(err => {
            console.error(err);
            setErrorMsg("Unable to save records! Please retry later!");
        });
}

const update = (transaction: Transaction) => {
    //transaction.isEditable = undefined;
    saveTransaction(transaction.id, transaction)
        .then(resp => setTransaction(transaction.map(t => t.id === transaction.id ? { ...resp.data } : tx)))
        .catch(err => {
            console.error(err);
            setErrorMsg("Unable to save records! Please retry later!");
        });
}

const remove = (id: number) => {
    deleteTransactionById(id)
        .then(_resp => setTransaction(Transactions.filter(tx => tx.id !== id)))
        .catch(err => {
            console.error(err);
            setErrorMsg("Unable to remove records! Please retry later!");
        });
}
        
   
    return (
        <>
            <section className="col-sm-10 m-2 mx-auto p-2">
                <h3>Statement</h3>

                {
                    errorMsg && (
                        <div className="alert alert-danger p-2">
                            <strong>{errorMsg}</strong>
                        </div>
                    )
                }
                <TransactionHeader />
                <TransactionForm />
                {/* {
                   (Transaction && Transaction.length > 0 ) &&(
                    Transaction.map((trans)=>trans.isEditable ? <TransactionForm key={trans.id}/>:<TransactionRows key={trans.id}/>)
                   )
                } */}
                <TransactionFooter />
            </section>
        </>
    )
}