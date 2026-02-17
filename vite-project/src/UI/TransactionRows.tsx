import 'bootstrap/dist/css/bootstrap.min.css';

export default function TransactionRows({ transactions, handleDeleteRow }: { transactions: any, handleDeleteRow: (event: React.MouseEvent<HTMLButtonElement>) => void }) {
    return (
        <div className="table-responsive" style={{ width: "90%", margin: "0 auto" }}>
            <table className="table table-bordered table-hover text-center">
                <tbody>
                    {transactions.map((transaction: any, index: number) => (
                        <tr key={transaction.id}>
                            <td>{index + 1}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.header}</td>
                            <td>{transaction.transactionType === "credit" ? transaction.amount : ""}</td>
                            <td>{transaction.transactionType === "debit" ? transaction.amount : ""}</td>
                            <td>
                                <button className="btn btn-sm btn-primary">Edit</button>
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