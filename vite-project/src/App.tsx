import Statement from './UI/Statement';
import Header from './UI/Header';
import { Fragment } from 'react/jsx-runtime';
function App() {

  return (
    <>
      <Fragment>
        <Header appTitle="Statement Tracker" />
        <div className="container-fluid p-2">
          <Statement />
        </div>
      </Fragment>
    </>

  );
}

export default App;

