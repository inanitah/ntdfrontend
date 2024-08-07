import axios from 'axios';
const VERSION = "v1"; // Change to the proper version
const API_URL = `${process.env.REACT_APP_API_URL || 'https://ntdbackend-3703dd1358c1.herokuapp.com'}/api/${VERSION}`;
console.log("API URL:", API_URL); // Debugging line to ensure the correct URL is used

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

export const fetchUserRecords = async (token, search, page, pageSize) => {
    const response = await axios.get(`${API_URL}/records/`, {
        params: { search, skip: (page - 1) * pageSize, limit: pageSize },
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};



export const deleteRecord = async (token, recordId) => {
    const response = await axios.delete(`${API_URL}/records/${recordId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
