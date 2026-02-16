import TransactionFooter from "./TransactionFooter";
import TransactionForm from "./TransactionForm";
import TransactionRows from "./TransactionRows";
import TransactionHeader from "./TransactionHeader";
import {getAllTransactions,getAllTransactionById,deleteTransactionById,addTransaction,saveTransaction} from "../Services/TransactionAPI";

import type { Transaction } from "../Models/Transaction";
import type { TransactionSummary } from "../Models/TransactionSummary";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Statement() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [transactionSummary, setTransactionSummary] = useState<TransactionSummary>({
        totalCredit: 0,
        totalDebit: 0,
        balance: 0
    })

    useEffect(()=>{
        getAllTransactions()
        .then(response =>{ setTransactions(response.data)
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error);
            setErrorMsg("unable to fetch data")
        })
    },[])
   // Sum of the colume of credit and debit column
   useEffect(()=>{
     if(transactions && transactions.length > 0){
        const sumOfColumn = (transaction : Transaction[], target : string) =>transaction.filter(t =>t.transactionType  === target)
        .map(t=>t.amount).reduce((a1:any,a2:any)=>a1+a2,0);

        const creditSum = sumOfColumn(transactions,"CREDIT");
        const debitSum = sumOfColumn(transactions,"DEBIT");
        setTransactionSummary({totalCredit : creditSum,totalDebit:debitSum,balance : creditSum - debitSum})
     }else{
        setTransactionSummary({totalCredit : 0,totalDebit:0,balance : 0})
     }
   },[transactions])

   /// Add row 
   const add = (transaction: Transaction) => {
    addTransaction(transaction)
        .then(response => setTransactions([...transactions, { ...response.data }]))
        .catch(err => {
            console.error(err);
            setErrorMsg("Unable to save records! Please retry later!");
        });
}

const update = (transaction: Transaction) => {
    //transaction.isEditable = undefined;
    saveTransaction(transaction.id, transaction)
        .then(resp => setTransactions(transactions.map(t => t.id === transaction.id ? { ...resp.data } : t)))
        .catch(err => {
            console.error(err);
            setErrorMsg("Unable to save records! Please retry later!");
        });
}

const remove = (id: number) => {
    deleteTransactionById(id)
        .then(_resp => setTransactions(transactions.filter(tx => tx.id !== id)))
        .catch(err => {
            console.error(err);
            setErrorMsg("Unable to remove records! Please retry later!");
        });
}
        

const edit = (id: number) => setTransactions(transactions.map(t => t.id === id ? { ...t, isEditable: true } : t))

const cancelEdit = (id: number) => setTransactions(transactions.map(t => t.id === id ? { ...t, isEditable: false } : t))


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
                   <TransactionForm  save={add}/>  
                 
                {
                    transactions.length > 0  &&
                   (
                    transactions.map(trans=>trans.isEditable ? 
                    <TransactionForm key={trans.id} trans={trans} save={update} cancle={cancelEdit}/>
                    :
                    <TransactionRows key={trans.id} txn={trans} edit={edit} remove={remove}/>)
                   )
                } 
                <TransactionFooter transactionSummary={transactionSummary}/>
            </section>
        </>
    )
}