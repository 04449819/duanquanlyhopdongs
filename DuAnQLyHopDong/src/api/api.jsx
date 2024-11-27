import axios from 'axios';

const client = axios.create({
    baseURL: process.env.REACT_APP_API_DEV,
});

class Api {
    static async get(url, params = {}) {
        try {
            const response = await client.get(url, { params });
            return response.data;
        } catch (error) {
            console.error("GET request failed:", error);
            throw error;
        }
    }

    static async post(url, data = {}) {
        try {
            const response = await client.post(url, data);
            return response.data;
        } catch (error) {
            console.error("POST request failed:", error);
            throw error;
        }
    }

    static async update(url, data = {}) {
        try {
            const response = await client.put(url, data);
            return response.data;
        } catch (error) {
            console.error("PUT request failed:", error);
            throw error;
        }
    }

    static async delete(url, params = {}) {
        try {
            const response = await client.delete(url, { params });
            return response.data;
        } catch (error) {
            console.error("DELETE request failed:", error);
            throw error;
        }
    }
}

export default Api;
