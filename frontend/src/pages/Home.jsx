import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import Notfound from "../components/NotFound/Notfound.jsx";
import "../styles/Chart.css";
function Home() {
  const [loginError, setLoginError] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BACK_URL;
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid Email address")
      .required("Please fill out this field"),
    password: Yup.string().required("Please fill out this field"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const axiosInstance = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/users/login", values);

      if (response.status === 200) {
        const token = response.headers["authorization"];
        if (token) {
          logIn(token);
          const decode = jwtDecode(token);
          if (decode.role == "super_user") {
            navigate("/homesuper");
          } else if (decode.role == "branch_seller") {
            navigate("/homenormal");
          } else if (decode.role == "branch_manager") {
            navigate("/homebranch");
          } else {
            <Notfound />;
          }
        } else if (!token) {
          setLoginError(true);
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error During Login", error);
      setLoginError(true);
    }
  };

  return (
    <div>
      <form className="loginform" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div
          className={`input-container ${
            formik.touched.username && formik.errors.username ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username *"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="errors">{formik.errors.username}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password && formik.errors.password ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="password *"
            autoComplete="off"
          />
          {loginError && (
            <div className="errors">Please Check your username password</div>
          )}
          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
        <div className="forgotgroup">
          <Link to="/forgotpassword">
            <button>Forgot Password</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Home;
