import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Signup() {
  const [registerError, setRegisterError] = useState("");
  const [iserror, setIserror] = useState("");
  const [allBranch, setAllBranch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { decodedToken, token } = useAuth();
  const headers = { Authorization: token };
  const headersWithContent = { ...headers, "Content-Type": "application/json" };
  const navigate = useNavigate();
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
    name: Yup.string().required("Please fill out this field"),
    // .matches(/^[a-zA-Z]+$/, "Name must contain only characters")
    // .min(3, "Name must be at lease 3 characters"),
    choosebranch: Yup.string().required("Please fill out this field"),
  });

  const handleSubmit = async (values) => {
    //filter values accepting of backend
    const formData = {
      username: values.username,
      password: values.password2,
      role: values.name,
      branch: values.choosebranch,
    };

    try {
      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: headersWithContent,
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const responseData = await response.json();
        setRegisterError(`${responseData.message}`);
      } else if (response.ok) {
        const responseData = await response.json();
        alert(`${responseData.message}`);
        if (decodedToken.role === "super_user") {
          navigate("/homesuper");
        } else {
          navigate("/homebranch");
        }
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
      choosebranch: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const radioValue = ["branch_manager", "branch_seller"];
  const fetchBranch = async () => {
    try {
      const response = await fetch("api/branches/getallbranch", { headers });
      if (!response.ok) {
        throw new Error("Failed to fetch branch");
      }
      const branches = await response.json();
      branches;
      setAllBranch(branches);
      setIsLoading(false);
    } catch (error) {
      console.error;
      setIserror(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBranch();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (iserror) {
    return <div>{iserror}</div>;
  }
  return (
    <div>
      <form className="signupform" onSubmit={formik.handleSubmit}>
        <h1>Signup</h1>
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
          className={`input-container-radio
           ${formik.touched.name && formik.errors.name ? "error" : ""}`}
        >
          <h3>Role:</h3>
          {radioValue.map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="name"
                value={value}
                checked={formik.values.name === value}
                onChange={formik.handleChange}
              />
              {value}
            </label>
          ))}
          {formik.touched.name && formik.errors.name ? (
            <div className="errors">{formik.errors.name}</div>
          ) : null}
        </div>
        <div
          className={`input-container-radio ${
            formik.touched.choosebranch && formik.errors.choosebranch
              ? "error"
              : ""
          }`}
        >
          <h3>Choose Branch</h3>
          {allBranch.map((value) => (
            <label key={value._id}>
              <input
                type="radio"
                name="choosebranch"
                value={value._id}
                checked={formik.values.choosebranch === value._id}
                onChange={formik.handleChange}
              />
              {value.branch_name}
            </label>
          ))}
          {formik.touched.choosebranch && formik.errors.choosebranch ? (
            <div className="errors">{formik.errors.choosebranch}</div>
          ) : null}
        </div>
        {registerError && <div className="errors">{registerError}</div>}
        <p className="checking-signup">
          {decodedToken.role == "super_user" && (
            <Link to="/homesuper">
              <button>Back Home!</button>
            </Link>
          )}
          {decodedToken.role == "branch_manager" && (
            <Link to="/homebranch">
              <button>Back Home</button>
            </Link>
          )}
          {decodedToken.role == "branch_seller" && (
            <Link to="/homenormal">
              <button>Back Home</button>
            </Link>
          )}
        </p>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
