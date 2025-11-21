import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext/AuthContext";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://money-map-server.vercel.app",
  // baseURL:"http://localhost:s"
});

const UseAxiosSecure = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use((config) => {
      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = instance.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => navigate("/auth/login"));
        }
        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return instance;
};

export default UseAxiosSecure;
