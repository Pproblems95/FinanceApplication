import '../../styles/App.css';
import { useTransactions, useGetTransactionsByUserId, usePostTransaction } from '../../shared/hooks/useTransactions';
import { useState, useEffect } from 'react';
import type { TransactionDto } from '../../shared/types/Transaction';

function App() {
  const [requestedTransactionByUserId, setRequestedTransactionByUserId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<string>("2026-05-01T00:00:00.000Z");
  const [untilDate, setUntilDate] = useState<string>(new Date().toISOString());
  const [newTransaction, setNewTransaction] = useState<TransactionDto | null>(null);

  // --- NUEVOS ESTADOS PARA EL FORMULARIO ---
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Outcome');
  const [userId, setUserId] = useState<number>(0);

  const { transactions, isLoading, error } = useTransactions();
  const { transactionsGetUserById, isLoadingGetUserById, errorGetUserById } = useGetTransactionsByUserId(requestedTransactionByUserId, fromDate, untilDate);
  const { transactionPost, isLoadingPostTransaction, errorPostTransaction } = usePostTransaction(newTransaction);

  useEffect(() => {
  if (transactionPost) {
    console.log(" El servidor respondió con éxito:", transactionPost);
    
  }
}, [transactionPost]);

  useEffect(() => {
  if (transactions) {
    console.log(" El servidor respondió con éxito:", transactions);
    
  }
}, [transactionPost])

// 3. (Opcional) Monitorear errores o estados de carga

  return (
    <div className='containerReact'>
      <div className="mainContent">
        
        {/* SECCIÓN DEL FORMULARIO PARA NUEVA TRANSACCIÓN */}
        <div style={{ border: '1px solid #4caf50', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2>Nueva Transacción</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <input 
              type="number" 
              placeholder="User ID" 
              className="bg-black text-white p-2"
              value={userId || ''} 
              onChange={(e) => setUserId(Number(e.target.value))} 
            />

            <input 
              type="number" 
              placeholder="Monto" 
              className="bg-black text-white p-2"
              value={amount || ''} 
              onChange={(e) => setAmount(Number(e.target.value))} 
            />

            <input 
              type="text" 
              placeholder="Descripción" 
              className="bg-black text-white p-2"
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />

            <select 
              className="bg-black text-white p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Outcome">Gasto (Outcome)</option>
              <option value="Income">Ingreso (Income)</option>
            </select>

            <button 
              style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px', cursor: 'pointer' }}
              onClick={() => {
                /* Aquí puedes implementar tu lógica para llamar a setNewTransaction */
                console.log("Datos listos:", { userId, amount, description, category });
                
                setNewTransaction({
                  id: 0, 
                  userId:userId,
                  amount: amount,
                  description: description,
                  date: new Date().toISOString(),
                  category: category
                 });
                 console.log(transactionPost);
              }}
            >
              Enviar Transacción
            </button>
          </div>
        </div>

        {/* SECCIÓN ORIGINAL DE BÚSQUEDA */}
        <h1>Contenido Principal</h1>
        <div style={{ border: '1px solid white', padding: '10px' }}>
          <input 
            placeholder='User ID' 
            type='number' 
            className=' bg-black text-white'  
            value={requestedTransactionByUserId ?? ''} 
            onChange={(e) => {setRequestedTransactionByUserId(Number(e.target.value))}}
          />
          <button onClick={() => {console.log('hook nuevo', transactionsGetUserById, isLoadingGetUserById, errorGetUserById)}}>
            Consultar Usuario
          </button>
          <button onClick={() => {console.log(transactions)}}>
            Presiona este boton si quieres sexo
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;