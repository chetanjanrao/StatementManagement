import { Fragment } from "react/jsx-runtime";
import type { TransactionSummary } from "../Models/TransactionSummary";


const TransactionFooter = ({transactionSummary} : {transactionSummary : TransactionSummary}) => (
    <Fragment>
        <div className="row p-1 mb-1 border-bottom border-dark fw-bold">
            <div className="col text-end">Totals</div>
            <div className="col-2 text-end">{transactionSummary?.totalCredit}</div>
            <div className="col-2 text-end">{transactionSummary?.totalDebit}</div>
            <div className="col-2 text-center"></div>

        </div>
        <div className="row p-1 mb-1 border-bottom border-dark fw-bold">
            <div className="col text-end">Balance</div>            
            <div className="col-2 text-center"></div>
            <div className="col-2 text-end">{transactionSummary?.balance}</div>            
            <div className="col-2 text-center"></div>
        </div>
    </Fragment>
);

export default TransactionFooter;