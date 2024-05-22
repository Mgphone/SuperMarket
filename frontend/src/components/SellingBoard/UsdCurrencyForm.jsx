import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import fetchsellingform from "../../utils/fetchingsellingform";
import { toast } from "react-toastify";
function UsdCurrencyForm({ buyingCurrency, rates }) {
  // const [amount, setAmount] = useState(0);
  const [currencyNote, setCurrentNote] = useState("bigNote");
  const { USD } = rates[0];
  const { token } = useAuth();
  // const handleAmountChange = (event) => {
  //   setAmount(event.target.value);
  // };
  const handleCurrencyNoteChange = (event) => {
    setCurrentNote(event.target.value);
  };
  const calculateTotal = (rates, buyingCurrency) => {
    const bigNotesValue = rates[0][buyingCurrency].bigNote;
    const smallNoteValue = rates[0][buyingCurrency].smallNote;
    return currencyNote === "bigNote"
      ? formik.values.amount * bigNotesValue
      : formik.values.amount * smallNoteValue;
  };
  //   {"buyer_name":"hellobuyer","buyer_identity":"link for cloudinary",
  // "currency":"GBP","Note":"","amount":"10"}
  const validationSchema = Yup.object({
    buyer_name: Yup.string().required("Please fill customer name"),
    buyer_identity: Yup.string().required("Please enter customer identity"),
    amount: Yup.number()
      .required("Please enter amount")
      .positive("Must be more than 0"),
    // currency: Yup.string().required("Need currency"),
  });
  const formik = useFormik({
    initialValues: {
      buyer_name: "",
      buyer_identity: "",
      currency: "",
      Note: "",
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = async (values) => {
    const formData = {
      buyer_name: values.buyer_name,
      buyer_identity: values.buyer_identity,
      currency: buyingCurrency,
      Note: currencyNote,
      amount: values.amount,
      // total: calculateTotal(rates, buyingCurrency),
    };

    try {
      const response = await fetchsellingform(formData, token);
      if (response.success) {
        toast("Successful");
      } else {
        toast(response.message.message);
      }
    } catch (error) {
      toast(error.message);
    }

    formik.resetForm();
  };
  return (
    <div className="sellingform">
      <h3>{buyingCurrency}BUY</h3>
      {/* {formik.touched.currency && formik.errors.currency ? (
        <div className="errors">{formik.errors.currency}</div>
      ) : null} */}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="Buyer Name">Please Enter Buyer Name</label>
        <input
          type="text"
          name="buyer_name"
          placeholder="Buyer Name"
          value={formik.values.buyer_name}
          onChange={formik.handleChange}
        ></input>
        {formik.touched.buyer_name && formik.errors.buyer_name ? (
          <div className="errors">{formik.errors.buyer_name}</div>
        ) : null}
        <label htmlFor="Buyer Identity">Please Enter buyer Identity </label>
        <input
          type="text"
          name="buyer_identity"
          placeholder="Buyer Identity"
          value={formik.values.buyer_identity}
          onChange={formik.handleChange}
        ></input>
        {formik.touched.buyer_identity && formik.errors.buyer_identity ? (
          <div className="errors">{formik.errors.buyer_identity}</div>
        ) : null}
        <label htmlFor="EnterAmount">Please Enter the Amount </label>
        <input
          type="number"
          name="amount"
          placeholder="Enter Amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
        ></input>
        {formik.touched.amount && formik.errors.amount ? (
          <div className="errors">{formik.errors.amount}</div>
        ) : null}
        <label htmlFor="currencyNote">Please Choose Big or Small Note</label>
        <select value={currencyNote} onChange={handleCurrencyNoteChange}>
          <option name="currencyNote" value="bigNote">
            Big Notes
          </option>
          <option name="currencyNote" value="smallNote">
            Small Notes
          </option>
        </select>

        {rates && buyingCurrency && (
          <label>Total in Bhat: {calculateTotal(rates, buyingCurrency)}</label>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UsdCurrencyForm;
