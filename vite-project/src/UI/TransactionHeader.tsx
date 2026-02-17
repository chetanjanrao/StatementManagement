
import "../index.css";
export default function TransactionHeader() {
    return (
        <>
           <div className='tableHeader'>
                <table className="table table-striped border">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Date</th>
                            <th>Header</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}