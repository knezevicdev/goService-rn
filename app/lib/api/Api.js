import axios from "axios";
import { getAccessToken } from '../auth';
import { api } from "../../config";

class Api {
    static axios = axios.create({
        baseURL: api.API_URL
    });

    static request = async (method, url, data = {}, headers = {}) => {
        const token = await getAccessToken();
        const requestHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...headers
        };

        return await this.axios({
            method,
            url,
            data,
            headers: requestHeaders
        });
    };

    static get = (url) => {
        return this.request('GET', url);
    };

    static post = (url, data = {}) => {
        return this.request('POST', url, data);
    };

    static patch = (url, data) => {
        return this.request('PATCH', url, data);
    };

    static put = (url, data) => {
        return this.request('PUT', url, data);
    };

    static delete = (url) => {
        return this.request('DELETE', url);
    };
}

export default Api;