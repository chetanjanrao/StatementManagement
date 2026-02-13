export default function TransactionForm() {
    return (
        <>
            <form className="row p-1 mb-1 border-bottom border-dark">
                <div className="col-1 text-end">tr.id</div>
                <div className="col-2 text-center">
                    <input className="form-control" type="date" 
                    />
                </div>
                <div className="col-2">
                    <input className="form-control" type="text" placeholder="enter header"
                       
                    />
                </div>
                <div className="col text-end">
                    <input type="text" placeholder="amount"/>
                </div>
                <div className="col text-end" >
                   
                <input type="text" placeholder="amount"/>
                    
                </div>
                <div className="col text-center">
                    
                                <button className="btn btn-sm btn-primary">
                                    <i className="bi bi-floppy" />
                                </button>
                                <button className="btn btn-sm btn-danger ms-1" type="button"
                                  >
                                    <i className="bi bi-x-circle" />
                                </button>
                </div>
            </form >
        </>
    )
}