import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://money-map-server.vercel.app",
    // baseURL: "http://localhost:5000"
});

const UseAxiosPublic = () => {
    return axiosPublic
}
export default UseAxiosPublic;