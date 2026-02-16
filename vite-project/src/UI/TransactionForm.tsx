import { Fragment, useState, type FormEvent } from "react";
import type { Transaction } from "../Models/Transaction";

export default function TransactionForm({
  trans,
  save,
  cancel,
}: {
  trans?: Transaction;
  save?: (transactions: Transaction) => void;
  cancel?: (id: number) => void;
}) {
  // Initialize state with either passed transaction or a new empty transaction
  const [transactions, setTransactions] = useState<Transaction>(
    trans
      ? { ...trans } // Use passed transaction for edit
      : {
          id: 0,
          header: "",
          transactionDate: new Date().toISOString().substring(0, 10), // Today's date in 'YYYY-MM-DD' format
          transactionType: "CREDIT", // Default value
          amount: 0,
        }
  );


  function formSubmitted()
  {
      
  }

  

  return (
    <>
      <form className="row p-1 mb-1 border-bottom border-dark" onSubmit={formSubmitted}>
        <div className="col-1 text-end">{transactions.id}</div>
        <div className="col-2 text-center">
          <input
            className="form-control"
            type="date"
            value={transactions.transactionDate}
            onChange={(e) => setTransactions({ ...transactions, transactionDate: e.target.value })}
          />
        </div>
        <div className="col-2">
          <input
            className="form-control"
            type="text"
            placeholder="enter header"
            value={transactions.header}
            onChange={(e) => setTransactions({ ...transactions, header: e.target.value })}
          />
        </div>
        <div className="col text-end" >
          {transactions.transactionType === "CREDIT" && (
            <input
              placeholder="amount"
              type="number"
              value={transactions.amount}
              onChange={(e) => setTransactions({ ...transactions, amount: Number(e.target.value) })}
            />
          )}
        </div>
        <div className="col text-end" >
          {transactions.transactionType === "DEBIT" && (
            <input
              type="number"
              placeholder="amount"
              value={transactions.amount}
              onChange={(e) => setTransactions({ ...transactions, amount: Number(e.target.value) })}
            />
          )}
        </div>
        <div className="col-2 text-center">
          {transactions.isEditable ? (
            <Fragment>
              <button className="btn btn-sm btn-primary">
                <i className="bi bi-floppy" />
              </button>
              <button
                className="btn btn-sm btn-danger ms-1"
                type="button"
                onClick={() => cancel && cancel(transactions.id)}
              >
                <i className="bi bi-x-circle" />
              </button>
            </Fragment>
          ) : (
            <button className="btn btn-sm btn-primary">
              <i className="bi bi-floppy" />
            </button>
          )}
        </div>
      </form>
    </>
  );
}
