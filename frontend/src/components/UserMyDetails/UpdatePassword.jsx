import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function UpdatePassword({ userDetails, setIsReset }) {
  const [fetchError, setFetchError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setIsReset(false);
  };
  const validationSchema = Yup.object({
    oldpassword: Yup.string().required("please fill out Old Password"),
    newpassword1: Yup.string().required("Please fill out New Password"),
    newpassword2: Yup.string()
      .oneOf([Yup.ref("newpassword1"), null], "Passwords must match")
      .required("please fill out new password"),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      oldpassword: "",
      newpassword1: "",
      newpassword2: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    const formData = {
      username: userDetails.username,
      oldpassword: values.oldpassword,
      newpassword: values.newpassword1,
    };
    try {
      setIsLoading(true);
      const response = await fetch("/api/users/update", {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`API request failed with status ${response.status}`);
      }
      const responsejson = await response.json();
      toast(responsejson.message);
      setIsLoading(false);
      setIsReset(false);
    } catch (error) {
      console.error(error);
      setFetchError(error);
    }
  };

  return (
    <div className="user-update-password">
      <h2>Update Password</h2>
      {isLoading && <div className="loader"></div>}
      <form onSubmit={formik.handleSubmit}>
        <input value={userDetails.username} disabled />
        <input
          type="password"
          name="oldpassword"
          placeholder="Enter Old Password"
          value={formik.values.oldpassword}
          onChange={formik.handleChange}
          autoComplete="off"
        />
        {formik.touched.oldpassword && formik.errors.oldpassword ? (
          <div className="error">{formik.errors.oldpassword}</div>
        ) : (
          ""
        )}
        <input
          type="password"
          name="newpassword1"
          placeholder="Enter New Password"
          value={formik.values.newpassword1}
          onChange={formik.handleChange}
          autoComplete="off"
        />
        {formik.touched.newpassword1 && formik.errors.newpassword1 ? (
          <div className="error">{formik.errors.newpassword1}</div>
        ) : (
          ""
        )}
        <input
          type="password"
          name="newpassword2"
          placeholder="Re-Enter New Password"
          value={formik.values.newpassword2}
          onChange={formik.handleChange}
          autoComplete="off"
        />
        {formik.touched.newpassword2 && formik.errors.newpassword2 ? (
          <div className="error">{formik.errors.newpassword2}</div>
        ) : (
          ""
        )}
        {fetchError && <p className="error">{fetchError.message}</p>}
        <button type="submit">Submit</button>
        <button onClick={handleClose}>Close</button>
      </form>
    </div>
  );
}

export default UpdatePassword;
