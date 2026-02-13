export default function Header({appTitle} : {appTitle : string})
{
    return(
        <>
               <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                   <div className="container-fluid">
                         <a className="navbar-brand" href="#">{appTitle}</a>            
                    </div>
               </nav>

        </>
    )
}