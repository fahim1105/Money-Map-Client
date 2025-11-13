import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://money-map-server.vercel.app',
});

const UseAxios = () => {
    return instance
};

export default UseAxios;