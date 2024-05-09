import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function RegisterSuper({ role }) {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const validationSchema = Yup.object({
    username: Yup.string()
      .email("username should be email address")
      .required("Please fill out this field"),
    password1: Yup.string()
      .required("Please fill out this field")
      .test(
        "password-length",
        "Password must contain at least 4 characters with at least one letter",
        (value) => {
          return /^(?=.*[a-zA-Z]).{4,}$/.test(value);
        }
      ),
    password2: Yup.string()
      .oneOf([Yup.ref("password1"), null], "Passwords must match")
      .required("Please fill out this field")
      .test(
        "password-length",
        "Password must contain at least 4 characters with at least one letter",
        (value) => {
          return /^(?=.*[a-zA-Z]).{4,}$/.test(value);
        }
      ),
    name: Yup.string()
      .required("Please fill out this field")
      .min(3, "Name must be at lease 3 characters"),
  });

  const handleSubmit = async (values) => {
    //filter values accepting of backend
    const formData = {
      username: values.username,
      password: values.password2,
      role: role,
      secret: values.name,
    };

    try {
      const response = await fetch(`/api/users/superregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(`${responseData.message}`);
        navigate("/homesuper");
      } else if (!response.ok) {
        const dataresponse = await response.json();
        setRegisterError(`${dataresponse.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password1: "",
      password2: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div>
      <form className="signupform" onSubmit={formik.handleSubmit}>
        <h1>Signup {role}</h1>
        <div
          className={`input-container ${
            formik.touched.username && formik.errors.username ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="username"
            placeholder="username *"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="errors">{formik.errors.username}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password1 && formik.errors.password1 ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password1"
            placeholder="password *"
            value={formik.values.password1}
            onChange={formik.handleChange}
          />
          {formik.touched.password1 && formik.errors.password1 ? (
            <div className="errors">{formik.errors.password1}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.password2 && formik.errors.password2 ? "error" : ""
          }`}
        >
          <input
            type="password"
            name="password2"
            placeholder="repeated password *"
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className="errors">{formik.errors.password2}</div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            formik.touched.name && formik.errors.name ? "error" : ""
          }`}
        >
          <input
            type="text"
            name="name"
            placeholder="secret *"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="errors">{formik.errors.name}</div>
          ) : null}
        </div>
        {registerError && <div className="errors">{registerError}</div>}
        <button type="submit">Signup</button>
        <div className="checking-signup">
          Back Home?
          <Link to="/homesuper">
            <button>Home</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterSuper;
