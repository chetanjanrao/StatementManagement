import TransactionFooter from "./TransactionFooter";
import TransactionForm from "./TransactionForm";
import TransactionRows from "./TransactionRows";
import TransactionHeader from "./TransactionHeader";
import {getAllTransactions,getAllTransactionById,deleteTransactionById,addTransaction,saveTransaction} from "../Services/TransactionAPI";

import type { Transaction } from "../Models/Transaction";
import type { TransactionSummary } from "../Models/TransactionSummary";
import { useEffect, useState } from "react";



const data = [
    {
        id: 0,
        header: "Salary",
        transactionDate: "2026-01-01",
        transactionType: "CREDIT",
        amount: 75000
    },
    {
        id: 1,
        header: "Grocery",
        transactionDate: "2026-01-02",
        transactionType: "DEBIT",
        amount: 5000
    }
];

function addNewRow(){

}

export default function Statement() {
    const [transactions, setTransactions] = useState<Transaction[]>(data);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [transactionSummary, setTransactionSummary] = useState<TransactionSummary>({
        totalCredit: 0,
        totalDebit: 0,
        balance: 0
    })
   console.log(transactions)
   
function handleEdit()
{

}

function handleDeleteRow()
{

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
                <TransactionForm   />   
                 
                {/* {
                    transactions.length > 0  &&
                   (
                    transactions.map(trans=>trans.isEditable ? 
                    <TransactionForm key={trans.id} trans={trans} />
                    :
                    <TransactionRows key={trans.id} txn={trans}/>)
                   )

                }  */}
                {
                    transactions.length > 0 && (
                        transactions.map(trans=>trans.isEditable ? (
                            <TransactionForm key={trans.id} trans={trans}/>
                        ) : <TransactionRows key={trans.id} txn={trans} edit={handleEdit} remove={handleDeleteRow}/>)
                    )
                }
                {/* <TransactionFooter transactionSummary={transactionSummary}/> */}
            </section>
        </>
    )
}