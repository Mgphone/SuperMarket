import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import Notfound from "../components/Notfound.jsx";

function Home() {
  const [loginError, setLoginError] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  // const handleregister = () => {
  //   return <Link to="/register" />;
  // };

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
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const token = response.headers.get("Authorization");
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
      console.error("Error during login", error);
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
          {/* <button onClick={() => handleregister}>Register</button> */}
          {/* <Link to="/register">
            {" "}
            <button>Register</button>
          </Link> */}
          {/* <Link to="/registersuper">
            <button>Register SuperUser</button>
          </Link> */}
        </div>
      </form>
    </div>
  );
}

export default Home;
