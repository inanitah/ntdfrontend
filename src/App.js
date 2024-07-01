import React, { useState, useEffect } from 'react';
import { login, createOperation, performCalculation, fetchOperations, fetchUserRecords, deleteRecord } from './api';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Input, Button, Pagination, Select, message } from 'antd';

const { Search } = Input;
const { Option } = Select;

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [operationType, setOperationType] = useState('');
    const [cost, setCost] = useState(0);
    const [operationId, setOperationId] = useState('');
    const [result, setResult] = useState(null);
    const [operations, setOperations] = useState([]);
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (token) {
            handleFetchRecords();
            handleFetchOperations();
        }
    }, [token, page, pageSize, search]);

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            setToken(data.username);
            localStorage.setItem('token', data.username);
            setLoginError('');
            message.success('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Login failed. Please check your username and password.');
            message.error('Login failed');
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setUsername('');
        setPassword('');
        message.success('Logged out');
    };

    const handleCreateOperation = async () => {
        try {
            const data = await createOperation(token, operationType, cost);
            setOperationId(data.id);
            handleFetchOperations();
            message.success('Operation created');
        } catch (error) {
            console.error('Create operation failed:', error);
            message.error('Create operation failed');
        }
    };

    const handlePerformCalculation = async () => {
        try {
            const data = await performCalculation(token, operationId);
            setResult(data.operation_response);
            handleFetchRecords();
            message.success('Calculation performed');
        } catch (error) {
            console.error('Perform calculation failed:', error);
            message.error('Perform calculation failed');
        }
    };

    const handleFetchOperations = async () => {
        try {
            const data = await fetchOperations(token);
            console.log('Fetched operations:', data);
            setOperations(data);
        } catch (error) {
            console.error('Fetch operations failed:', error);
            message.error('Fetch operations failed');
        }
    };

    const handleFetchRecords = async () => {
        try {
            const data = await fetchUserRecords(token, search, page, pageSize);
            console.log('Fetched records:', data);
            const filteredRecords = data.filter(record => !record.deleted); // Filter out deleted records
            setRecords(filteredRecords);
            setTotalRecords(filteredRecords.length);
        } catch (error) {
            console.error('Fetch records failed:', error);
            message.error('Fetch records failed');
        }
    };

    const handleDeleteRecord = async (recordId) => {
        try {
            await deleteRecord(token, recordId);
            handleFetchRecords();
            message.success('Record deleted');
        } catch (error) {
            console.error('Delete record failed:', error);
            message.error('Delete record failed');
        }
    };

    return (
        <div className="App">
            <h1>NTDSoftware Arithmetic Calculator</h1>

            {!token ? (
                <div className="form-container">
                    <h2>Login</h2>
                    <p>Please enter your username and password to log in.</p>
                    <label>
                        Username:
                        <Input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {loginError && <p className="error">{loginError}</p>}
                    <Button onClick={handleLogin}>Login</Button>
                </div>
            ) : (
                <div>
                    <Button className="button-sign-out" onClick={handleLogout}>Sign out</Button>
                    <div className="form-container">
                        <h2>Welcome to the NTDSoftware Arithmetic Calculator</h2>
                        <p>
                            This application provides basic arithmetic operations including addition, subtraction,
                            multiplication, division, square root calculation, and random string generation.
                            Each operation has an associated cost, and your account will be charged accordingly for each request.
                            You can view your operation records, perform new operations, and manage your account balance.
                        </p>
                    </div>
                    <div className="form-container">
                        <h2>Create a New Operation</h2>
                        <p>Select an operation type and enter the cost.</p>
                        <label>
                            Operation Type:
                            <Select
                                placeholder="Select an operation type"
                                value={operationType}
                                onChange={(value) => setOperationType(value)}
                                style={{ width: '100%' }}
                            >
                                <Option value="addition">Addition</Option>
                                <Option value="subtraction">Subtraction</Option>
                                <Option value="multiplication">Multiplication</Option>
                                <Option value="division">Division</Option>
                                <Option value="square_root">Square Root</Option>
                                <Option value="random_string">Random String</Option>
                            </Select>
                        </label>
                        <label>
                            Cost:
                            <Input
                                type="number"
                                placeholder="Enter the cost of the operation"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </label>
                        <Button onClick={handleCreateOperation}>Create Operation</Button>
                    </div>

                    <div className="form-container">
                        <h2>Perform a Calculation</h2>
                        <p>Select the operation ID to perform the calculation.</p>
                        <label>
                            Operation ID:
                            <Select
                                placeholder="Select an operation ID"
                                value={operationId}
                                onChange={(value) => setOperationId(value)}
                                style={{ width: '100%' }}
                            >
                                {operations.map((op) => (
                                    <Option key={op.id} value={op.id}>{op.id}: {op.type}</Option>
                                ))}
                            </Select>
                        </label>
                        <Button onClick={handlePerformCalculation}>Perform Calculation</Button>
                        {result && <p>Result: {result}</p>}
                    </div>

                    <div className="form-container">
                        <h2>Available Operations</h2>
                        <p>Here is the list of available operations with their IDs.</p>
                        <ul>
                            {operations.map((op) => (
                                <li key={op.id}>{op.id}: {op.type} - Cost: {op.cost}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="table-container">
                        <h2>Your Operation Records</h2>
                        <p>Search and view your operation records. You can also delete records.</p>
                        <Search
                            placeholder="Search your records"
                            onSearch={(value) => setSearch(value)}
                            style={{ marginBottom: 20 }}
                        />
                        <Table
                            dataSource={records}
                            columns={[
                                { title: 'ID', dataIndex: 'id', key: 'id' },
                                { title: 'Operation ID', dataIndex: 'operation_id', key: 'operation_id' },
                                { title: 'User ID', dataIndex: 'user_id', key: 'user_id' },
                                { title: 'Amount', dataIndex: 'amount', key: 'amount' },
                                { title: 'User Balance', dataIndex: 'user_balance', key: 'user_balance' },
                                { title: 'Operation Response', dataIndex: 'operation_response', key: 'operation_response' },
                                { title: 'Created At', dataIndex: 'created_at', key: 'created_at' },
                                { title: 'Actions', key: 'actions', render: (_, record) => (
                                    <Button type="link" onClick={() => handleDeleteRecord(record.id)}>
                                        Delete
                                    </Button>
                                ) },
                            ]}
                            pagination={false}
                            rowKey="id"
                        />
                        <Pagination
                            current={page}
                            pageSize={pageSize}
                            total={totalRecords}
                            onChange={(page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }}
                            showSizeChanger
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
