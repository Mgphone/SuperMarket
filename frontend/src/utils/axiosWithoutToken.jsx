import axios from "axios";
const url = import.meta.env.VITE_BACK_URL;
const axiosCustom = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosCustom;
