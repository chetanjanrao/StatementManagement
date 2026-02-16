import type { Transaction } from "../Models/Transaction";

export default function TransactionRows({ txn, edit, remove }: { txn: Transaction, edit: (id: number) => void, remove: (id: number) => void }) {
    return (
        <>
            <h3>Hello TransactionsaRow</h3>
            <div className="row p-1 mb-1 border-bottom border-info">
                <div className="col-1 text-end">{txn.id}</div>
                <div className="col-2 text-center">{txn.trasactionDate}</div>
                <div className="col">{txn.header}</div>
                <div className="col-2 text-end">{txn.transactionType === "CREDIT" && txn.amount}</div>
                <div className="col-2 text-end">{txn.transactionType === "DEBIT" && txn.amount}</div>
                <div className="col-2 text-center">
                    <button type="button" className="btn btn-sm btn-secondary" onClick={_e => edit(txn.id)}>
                        <i className="bi bi-pen" title="EDIT" />
                    </button>
                    <button className="btn btn-sm btn-danger ms-1" onDoubleClick={_e => remove(txn.id)}>
                        <i className="bi bi-trash" title="double click to DELETE" />
                    </button>
                </div>
            </div>
        </>
    )
}