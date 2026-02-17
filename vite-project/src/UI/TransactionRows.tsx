import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Transaction } from '../Models/Transaction';


export default function TransactionRows({ transactions, handleDeleteRow }: { transactions: any, handleDeleteRow: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    const [isEditting, setIsEditting] = useState<boolean>(false);


    function handleEditTransactionRow(id: Number) {
        console.log(id)
        setIsEditting(!isEditting)
    }

    function handleSaveChanges(id : Number)
    {
         console.log("save",id)
    }
    function handleCancleChaneges(id:Number)
    {
        console.log("cancle",id)
    }
    return (
        <div className="table-responsive" style={{ width: "90%", margin: "0 auto" }}>
            <table className="table table-bordered table-hover text-center">
                <tbody>
                    {!isEditting ? transactions.map((transaction: any, index: number) => (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.header}</td>
                            <td>{transaction.transactionType === "credit" ? transaction.amount : ""}</td>
                            <td>{transaction.transactionType === "debit" ? transaction.amount : ""}</td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => handleEditTransactionRow(transaction.id)}>Edit</button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onDoubleClick={() => handleDeleteRow(transaction.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )) : transactions.map((transaction: any, index: number) => (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td><input type="date" value={transaction.transactionDate}/></td>
                            <td><input type="text" value={transaction.header}/></td>
                            <td><input type="text" value={transaction.transactionType === "credit" ? transaction.amount : ""}/></td>
                            <td><input type="text" value={transaction.transactionType === "debit" ? transaction.amount : ""}/></td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={() => handleSaveChanges(transaction.id)}>save</button>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onDoubleClick={() => handleCancleChaneges(transaction.id)}
                                >
                                    cancle
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}