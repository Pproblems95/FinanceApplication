import '../styles/App.css';
import useTransactions from '../shared/hooks/useTransactions';


function App() {
  const {transactions, isLoading, error} = useTransactions()
  return (
    <div className='containerReact'>     
      <div className="mainContent" onClick={() => {console.log(transactions, isLoading, error)}}>

        <h1>Contenido Principal</h1>
        <div style={{ border: '1px solid white', padding: '10px' }}>
          x
        </div>
      </div>
    </div>
  );
}

export default App;
