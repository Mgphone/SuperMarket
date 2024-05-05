import { useState } from "react";
const initialValues = {
  USDSMALL: "",
  USDBIG: "",
  GBP: "",
  YEN: "",
  KYAT: "",
  SINDOLLAR: "",
};

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
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
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
    e.preventDefault();
    console.log("before fetching " + values);
    console.log(url);
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: `${urlMethod}`,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log("fetching time" + JSON.stringify(response));

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
  return (
    <div className="rateform">
      {isupdateForm && <h1>Edit Rate Form</h1>}
      {iscreateForm && <h1>Create Rate Form</h1>}
      <form onSubmit={handleSubmit}>
        {Object.entries(values).map(([label, value]) => (
          <div key={label}>
            <label htmlFor={label}>{label}</label>
            <input
              type="number"
              id={label}
              name={label}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ChangeRateForm;
