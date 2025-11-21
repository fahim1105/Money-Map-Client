import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://money-map-server.vercel.app',
    // baseURL: "http://localhost:5000"
});

const UseAxios = () => {
    return instance
};

export default UseAxios;