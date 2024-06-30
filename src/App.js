import React, { useState, useEffect } from 'react';
import { login, createOperation, performCalculation, fetchOperations, fetchUserRecords } from './api';
import './App.css';  // Import the CSS file

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [operationType, setOperationType] = useState('');
    const [cost, setCost] = useState(0);
    const [operationId, setOperationId] = useState('');
    const [result, setResult] = useState(null);
    const [operations, setOperations] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        console.log('Token updated:', token);
    }, [token]);

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            console.log('Login successful:', data);
            setToken(data.username);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleCreateOperation = async () => {
        try {
            const data = await createOperation(token, operationType, cost);
            console.log('Operation created:', data);
            setOperationId(data.id);
        } catch (error) {
            console.error('Create operation failed:', error);
        }
    };

    const handlePerformCalculation = async () => {
        try {
            const data = await performCalculation(token, operationId);
            console.log('Calculation performed:', data);
            setResult(data.operation_response);
        } catch (error) {
            console.error('Perform calculation failed:', error);
        }
    };

    const handleFetchOperations = async () => {
        try {
            const data = await fetchOperations(token);
            console.log('Fetched operations:', data);
            setOperations(data);
        } catch (error) {
            console.error('Fetch operations failed:', error);
        }
    };

    const handleFetchRecords = async () => {
        try {
            const data = await fetchUserRecords(token);
            console.log('Fetched records:', data);
            setRecords(data);
        } catch (error) {
            console.error('Fetch records failed:', error);
        }
    };

    return (
        <div className="App">
            <h1>Simple Calculator Frontend</h1>

            {!token ? (
                <div>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <h2>Create Operation</h2>
                    <input
                        type="text"
                        placeholder="Operation Type"
                        value={operationType}
                        onChange={(e) => setOperationType(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Cost"
                        value={cost}
                        onChange={(e) => setCost(e.target.value)}
                    />
                    <button onClick={handleCreateOperation}>Create Operation</button>

                    <h2>Perform Calculation</h2>
                    <input
                        type="text"
                        placeholder="Operation ID"
                        value={operationId}
                        onChange={(e) => setOperationId(e.target.value)}
                    />
                    <button onClick={handlePerformCalculation}>Perform Calculation</button>
                    {result && <p>Result: {result}</p>}

                    <h2>Fetch Operations</h2>
                    <button onClick={handleFetchOperations}>Fetch Operations</button>
                    <ul>
                        {operations.map((op) => (
                            <li key={op.id}>{op.type} - {op.cost}</li>
                        ))}
                    </ul>

                    <h2>Fetch User Records</h2>
                    <button onClick={handleFetchRecords}>Fetch Records</button>
                    <ul>
                        {records.map((record) => (
                            <li key={record.id}>{record.operation_response} - {record.user_balance}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
