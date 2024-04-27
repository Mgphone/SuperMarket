import { useFormik } from "formik";
import * as Yup from "yup";
function UserResetPassword({
  setIsResetPassword,
  resetValue,
  headers,
  setError,
}) {
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
    const url = `/api/users/resetpassword/${resetValue}`;
    const headersWithContent = {
      ...headers,
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: headersWithContent,
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to edit passsword");
      }
      const editJson = await response.json();
      editJson;
      alert(editJson.message);
      setIsResetPassword(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <div className="userreset">
      <h2>UserResetPassword</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="newpassword"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">enter password</div>
        ) : (
          ""
        )}
        <button onClick={handleReset}>Close</button>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default UserResetPassword;
