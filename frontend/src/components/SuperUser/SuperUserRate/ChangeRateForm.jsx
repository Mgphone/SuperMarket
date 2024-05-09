import { useFormik } from "formik";
import * as Yup from "yup";

function ChangeRateForm({
  isupdateForm,
  iscreateForm,
  token,
  setIsFetchError,
  setFetchRate,
  fetchGetRate,
  setIsForm,
  setIsLoading,
}) {
  const validationSchema = Yup.object({
    USDSMALL: Yup.string()
      .required("Please fill out this field")
      .matches(/^[0-9]+$/, "Only digits are allowed"),
    USDBIG: Yup.string()
      .required("Please fill out this field")
      .matches(/^[0-9]+$/, "Only digits are allowed"),
    GBP: Yup.string()
      .required("Please fill out this field")
      .matches(/^[0-9]+$/, "Only digits are allowed"),
    YEN: Yup.string()
      .required("Please fill out this field")
      .matches(/^[0-9]+$/, "Only digits are allowed"),
    KYAT: Yup.string()
      .required("Please fill out this field")
      .matches(/^[0-9]+$/, "Only digits are allowed"),
    SINDOLLAR: Yup.string()
      .required("Please fill out this field")
      .matches(/^[0-9]+$/, "Only digits are allowed"),
  });

  const handleSubmit = async (values) => {
    const formData = {
      USDSMALL: values.USDSMALL,
      USDBIG: values.USDBIG,
      GBP: values.GBP,
      YEN: values.YEN,
      KYAT: values.KYAT,
      SINDOLLAR: values.SINDOLLAR,
    };
    let url;
    let urlMethod;
    const editFormUrl = "/api/rate/updaterate";
    const createFormUrl = "/api/rate/createrate";
    if (isupdateForm === true) {
      url = editFormUrl;
      urlMethod = "PATCH";
    } else if (iscreateForm === true) {
      url = createFormUrl;
      urlMethod = "POST";
    }

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: `${urlMethod}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        responseJSON;
        setFetchRate(responseJSON);
        fetchGetRate();
        setIsForm(false);
        setIsLoading(false);
      } else {
        throw new Error("Failed to create/update rate");
      }
    } catch (error) {
      console.error(error);
      setIsFetchError(error);
      setIsLoading(false);
    }
  };
  const handleRateCloseForm = () => {
    setIsForm(false);
  };
  const formik = useFormik({
    initialValues: {
      USDSMALL: "",
      USDBIG: "",
      GBP: "",
      YEN: "",
      KYAT: "",
      SINDOLLAR: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div className="rateform">
      <>
        <div className="updatformclose">
          {isupdateForm && <h1>Edit Rate Form</h1>}
          {iscreateForm && <h1>Create Rate Form</h1>}

          <div onClick={handleRateCloseForm}>X</div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {Object.entries(formik.values).map(([label, value]) => (
            <div key={label}>
              <label htmlFor={label}>{label}</label>
              <input
                type="number"
                placeholder={label}
                id={label}
                name={label}
                value={value}
                onChange={formik.handleChange}
              />
              {formik.touched[label] && formik.errors[label] ? (
                <div className="error">{formik.errors[label]} </div>
              ) : null}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </>
    </div>
  );
}

export default ChangeRateForm;
