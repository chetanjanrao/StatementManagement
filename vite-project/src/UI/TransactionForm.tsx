
import { Fragment, useState, type SubmitEvent } from "react";
import type { Transaction } from "../Models/Transaction";



export default function TransactionForm({ trans, save, cancle }: { trans?: Transaction; save: (transatrions: Transaction) => void, cancle: (id: number) => void }) {

    const [transactions, setTransactions] = useState<Transaction>(
        trans ? { ...trans } : {
            id: 0,
            header: "",
            transactionDate: new Date().toISOString().substring(0, 10),  // Today's date in 'YYYY-MM-DD' format
            transactionType: "CREDIT",  // Default value
            amount: 0,
        }
    );
    console.log(transactions)
    const toggleType = (transactionType: string) => {
        setTransactions({ ...transactions, transactionType });
    }

    const formSubmitted = (e: SubmitEvent) => {
        e.preventDefault();
        save({ ...transactions });
        if (!transactions.isEditable) {
            setTransactions({
                id: 0,
                header: "",
                transactionDate: new Date().toISOString().substring(0, 10),  // Today's date in 'YYYY-MM-DD' format
                transactionType: "CREDIT",  // Default value
                amount: 0,
            })
        }
    }




    return (
        <>
            <form className="row p-1 mb-1 border-bottom border-dark" onSubmit={formSubmitted}>
                <div className="col-1 text-end">{trans.id}</div>
                <div className="col-2 text-center">
                    <input className="form-control" type="date" value={trans.trasactionDate}
                        onChange={(e) => setTransactions({ ...trans, transactionDate: e.target.value })}
                    />
                </div>
                <div className="col-2">
                    <input className="form-control" type="text" placeholder="enter header"
                        value={trans.header}
                        onChange={e => setTransactions({ ...trans, header: e.target.value })}
                    />
                </div>
                <div className="col text-end" onClick={_e => toggleType("CREDIT")}>
                    {
                        trans?.transactionType === "CREDIT" &&

                        <input placeholder="amount" type="number" value={trans.amount}
                            onChange={(e) => setTransactions({ ...trans, amount: Number(e.target.value) })}
                        />}
                </div>
                <div className="col text-end" onClick={_e => toggleType("DEBIT")}>
                    {
                        trans?.transactionType === "DEBIT" &&
                        <input type="Number" placeholder="amount" value={trans?.amount}

                            onChange={(e) => setTransactions({ ...trans, amount: Number(e.target.value) })} />
                    }
                </div>
                <div className="col-2 text-center">
                {
                    trans.isEditable ? (
                        <Fragment>
                            <button className="btn btn-sm btn-primary">
                                <i className="bi bi-floppy" />
                            </button>
                            <button className="btn btn-sm btn-danger ms-1" type="button"
                                onClick={_e => cancle && cancle(transactions.id)} >
                                <i className="bi bi-x-circle" />
                            </button>
                        </Fragment>
                    ) : (
                        <button className="btn btn-sm btn-primary">
                            <i className="bi bi-floppy" />
                        </button>
                    )
                }
            </div>
            </form >
        </>
    )
}