// const axiosInstance = axios.create({
//   baseURL: url,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";
// const { token } = useAuth();
// const url = import.meta.env.VITE_BACK_URL;
// const axiosWithHeader = axios.create({
//   baseURL: url,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// axiosWithHeader.interceptors.request.use(
//   (response) => {
//     if (token) {
//       response.headers.Authorization = token;
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// export default axiosWithHeader;
import axios from "axios";
const url = import.meta.env.VITE_BACK_URL;
const axiosWithHeader = (value) => {
  const axiosCreate = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });
  axiosCreate.interceptors.request.use(
    (response) => {
      if (value) {
        response.headers.Authorization = value;
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosCreate;
};
export default axiosWithHeader;
