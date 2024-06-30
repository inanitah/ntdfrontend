import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const login = async (username, password) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await axios.post(`${API_URL}/token`, params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
};


export const createOperation = async (token, operationType, cost) => {
    const response = await axios.post(`${API_URL}/operations/`, { type: operationType, cost }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const performCalculation = async (token, operationId) => {
    const response = await axios.post(`${API_URL}/calculate/`, { operation_id: operationId }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchOperations = async (token) => {
    const response = await axios.get(`${API_URL}/operations/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const fetchUserRecords = async (token) => {
    const response = await axios.get(`${API_URL}/records/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
