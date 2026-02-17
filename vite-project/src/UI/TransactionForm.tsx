import { useState } from "react";
import { Transaction } from "../Models/Transaction";

export default function TransactionForm({handleAddNewRow}: {handleAddNewRow: (newTransaction: Transaction) => void}) {
  // Define initial form state
  const [formData, setFormData] = useState<Transaction>({
    transactionDate: "",
    header: "",
    transactionType: "credit",
    amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Update state based on input type (Credit or Debit)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Collect form data into one object
    console.log('Form Data:', formData);
    
    // Optionally, reset the form
    setFormData({
      transactionDate: "",
      header: "",
      transactionType: "credit",
      amount: 0,
    });
    handleAddNewRow(formData)
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const amount = parseFloat(value) || 0;

    // If the transaction type is credit, update the amount as credit
    if (formData.transactionType === "credit" && name === "inputCredit") {
      setFormData((prevData) => ({
        ...prevData,
        amount: amount,
      }));
    }

    // If the transaction type is debit, update the amount as debit
    if (formData.transactionType === "debit" && name === "inputDebit") {
      setFormData((prevData) => ({
        ...prevData,
        amount: amount,
      }));
    }
  };

  return (
    <div>
      <form className="row g-3 p-2" onSubmit={handleSubmit}>
        <div className="col-md-2">
          <label htmlFor="inputDate" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="inputDate"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="inputHeader" className="form-label">
            Header
          </label>
          <input
            type="text"
            placeholder="Enter header"
            className="form-control"
            id="inputHeader"
            name="header"
            value={formData.header}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="inputTransactionType" className="form-label">
            Transaction Type
          </label>
          <select
            id="inputTransactionType"
            name="transactionType"
            className="form-control"
            value={formData.transactionType}
            onChange={handleChange}
          >
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        {/* Credit Amount input */}
        {formData.transactionType === "credit" && (
          <div className="col-md-2">
            <label htmlFor="inputCredit" className="form-label">
              Credit Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="inputCredit"
              name="inputCredit"
              value={formData.amount > 0 ? formData.amount : ""}
              onChange={handleAmountChange}
            />
          </div>
        )}

        {/* Debit Amount input */}
        {formData.transactionType === "debit" && (
          <div className="col-md-2">
            <label htmlFor="inputDebit" className="form-label">
              Debit Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="inputDebit"
              name="inputDebit"
              value={formData.amount > 0 ? formData.amount : ""}
              onChange={handleAmountChange}
            />
          </div>
        )}

        <div className="col-2">
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
