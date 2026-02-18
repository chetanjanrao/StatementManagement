import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Transaction } from '../Models/Transaction';


export default function TransactionRows({ transactions, handleDeleteRow, setTransactions }: { transactions: any, handleDeleteRow: (event: React.MouseEvent<HTMLButtonElement>) => void, setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }) {
    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const [editingRow, setIsEditingRow] = useState<Transaction | null>(null)


    function handleEditTransactionRow(RowId: number) {
        console.log(RowId)
        if (selectedRowId === RowId) {
            setSelectedRowId(null);
            setIsEditingRow(null);
        } else {
            setSelectedRowId(RowId);
            const row = transactions.find((r: any) => r.id === RowId) || null;
            setIsEditingRow(row);
        }

    }


    // Function to handle changes to row data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Transaction) => {
        if (editingRow) {
            setIsEditingRow({ ...editingRow, [field]: e.target.value });

        }
    }

    function handleSaveChanges(id: number) {

        if (editingRow) {
            setTransactions((prevRows) =>
                prevRows.map((row: any) =>
                    row.id === editingRow?.id ? { ...row, ...editingRow } : row
                )
            );
            setIsEditingRow(null);
            setSelectedRowId(null);
        }

    }
    function handleCancleChaneges(id: Number) {
        console.log("cancle", id)
        setIsEditingRow(null);
    setSelectedRowId(null);
    }
    return (
        <div className="table-responsive" style={{ width: "90%", margin: "0 auto" }}>
            <table className="table table-bordered table-hover text-center">
                <tbody>
                    {transactions.map((transaction: any, index: number) => (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>
                                {selectedRowId === transaction.id && editingRow ?
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="inputDate"
                                        name="transactionDate"
                                        value={transaction.transactionDate}
                                        onChange={(e) => handleInputChange(e, "transactionDate")}
                                    />
                                    : (transaction.transactionDate)
                                }




                            </td>
                            <td>{selectedRowId === transaction.id && editingRow ?

                                <input type="text"
                                    name="header"
                                    value={transaction.header}
                                    onChange={(e) => handleInputChange(e, "header")}
                                />
                                : (transaction.header)
                            }
                            </td>


                            <td>
                                {transaction.transactionType === "credit" ? (
                                    selectedRowId === transaction.id && editingRow ? (
                                        <input
                                            type="number"
                                            name="inputCredit"
                                            value={transaction.amount}
                                            onChange={(e) => handleInputChange(e, "amount")}
                                        />
                                    ) : (
                                        transaction.amount
                                    )
                                ) : (
                                    ""
                                )}
                            </td>
                            <td>
                                {transaction.transactionType === "debit" ? (
                                    selectedRowId === transaction.id && editingRow ? (
                                        <input
                                            type="number"
                                            name="inputCredit"
                                            value={transaction.amount}
                                            onChange={(e) => handleInputChange(e, "amount")}
                                        />
                                    ) : (
                                        transaction.amount
                                    )
                                ) : (
                                    ""
                                )}
                            </td>
                            <td>
                                {(selectedRowId ===transaction.id && editingRow) ?<button className="btn btn-sm btn-primary" onClick={() => handleCancleChaneges(transaction.id)}>cancle</button> :<button className="btn btn-sm btn-primary" onClick={() => handleEditTransactionRow(transaction.id)}>Edit</button> }
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}