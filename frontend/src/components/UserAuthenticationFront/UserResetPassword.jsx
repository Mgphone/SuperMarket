import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axiosWithHeader from "../../utils/axiosWithHeader";
import { useState } from "react";
function UserResetPassword({ setIsResetPassword, resetValue, token }) {
  const [resetPasswordError, setResetPasswordError] = useState("");
  const axiosInstance = axiosWithHeader(token);
  const handleReset = () => {
    setIsResetPassword(false);
  };
  const validationSchema = Yup.object({
    password: Yup.string().required("please filled out this field"),
  });
  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    const formData = { newpassword: values.password };
    try {
      const response = await axiosInstance.patch(
        `/users/resetpassword/${resetValue}`,
        formData
      );
      if (response.status >= 200 && response.status < 300) {
        const editJson = await response.data;
        toast(editJson.message);
        setIsResetPassword(false);
      } else {
        throw new Error("Failed to edit passsword");
      }
    } catch (error) {
      console.error(error);
      setResetPasswordError("Can Not change Password!!!");
    }
  };
  return (
    <>
      <div className="userreset">
        <h2>UserResetPassword</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="off"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">enter password</div>
          ) : (
            ""
          )}
          <button type="submit">Change Password</button>
          <button onClick={handleReset}>Close</button>
          {resetPasswordError && (
            <div className="error">{resetPasswordError}</div>
          )}
        </form>
      </div>
    </>
  );
}

export default UserResetPassword;
