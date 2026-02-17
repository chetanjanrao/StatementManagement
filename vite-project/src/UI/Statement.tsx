import React, { useState } from 'react';
import "../index.css";
import TransactionHeader from './TransactionHeader'
import TransactionForm from './TransactionForm';
import { Transaction } from '../Models/Transaction';
import TransactionRows from './TransactionRows';


let data = [
    {
        id: 1,
        transactionDate: "2024-06-01",
        header: "Salary",
        transactionType : "credit",
        amount: 5000
    },
    {
        id: 2,
        transactionDate: "2024-06-05",
        header: "Groceries",
        transactionType : "debit",
        amount: 150
      
    },
    {
        id: 3,
        transactionDate: "2024-06-10",
        header: "Freelance Project",
        transactionType : "credit",
        amount: 1200,
       
    },
   
]

export default function Statement() {
    const [transactions, setTransactions] = React.useState(data);
   
 
    console.log('Current transactions:', transactions);
    function addTransaction(newTransaction: Transaction) {
        const newId = transactions.length > 0 ? transactions[transactions.length-1].id + 1 : 1;
        setTransactions(prevTransactions => [
            ...prevTransactions,
            { ...newTransaction, id: newId }
          ]);
        console.log('Adding new transaction:', newTransaction);
    }

    /// Delete transaction by id
    function handleDeleteRow(id: number) {
        console.log(id)
        setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
    }
    /// Edit Transaction
   
    return (
        <div className='statementContainer'>
                <TransactionHeader />
                <TransactionForm handleAddNewRow={addTransaction}/>
                <TransactionRows transactions={transactions} handleDeleteRow={(id) => handleDeleteRow(Number(id))} />
                <hr/>
        </div>
    )
}
