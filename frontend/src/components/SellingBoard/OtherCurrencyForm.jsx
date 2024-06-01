import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchsellingform from "../../utils/fetchingsellingform";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
function OtherCurrencyForm({ buyingCurrency, rates }) {
  const [amount, setAmount] = useState(0);
  const { GBP, YEN, KYAT, SINDOLLAR } = rates[0];
  const { token } = useAuth();
  // const handleAmountChange = (e) => {
  //   setAmount(e.target.value);
  // };
  const calculateTotal = (rates, buyingCurrency) => {
    return formik.values.amount * rates[0][buyingCurrency];
  };
  const validationSchema = Yup.object({
    buyer_name: Yup.string().required("Please fill the customer name"),
    buyer_identity: Yup.string().required("Please enter customer identity"),
    amount: Yup.number()
      .required("Please enter the amount")
      .positive("Must be more than 0"),
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
      Note: "",
      amount: values.amount,
    };
    try {
      const response = await fetchsellingform(formData, token);
      if (response.success) {
        toast(`Successful Create The ${buyingCurrency} Transition`);
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
      <h3>{buyingCurrency} BUY</h3>
      {/* {rates[0][buyingCurrency]} */}
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

        {rates && buyingCurrency && (
          <label>Total in Bhat: {calculateTotal(rates, buyingCurrency)}</label>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OtherCurrencyForm;
