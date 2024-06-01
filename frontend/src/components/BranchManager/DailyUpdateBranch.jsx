import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firstTenDigits from "../../utils/firstTenDigits";
import axiosWithHeader from "../../utils/axiosWithHeader";
function DailyUpdateBranch({ setIsManagerDashboard, setIsDailyUpdateBranch }) {
  const [branchName, setBranchName] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTime, setIsLoadingTime] = useState(false);
  const [openBranchError, setOpenBranchErrror] = useState(false);
  const { token } = useAuth();
  const axiosInstance = axiosWithHeader(token);
  //to get branch Name
  const fetchToGetBranchName = async () => {
    setIsLoadingTime(true);
    try {
      const response = await axiosInstance("/branches/getallbranch");
      if (response.status < 200 || response.status >= 300) {
        setIsError("Error when fetching to get branch");
      }
      const responsesJson = await response.data;
      setBranchName(responsesJson);
      setIsLoadingTime(false);
    } catch (error) {
      console.error(error);
      setOpenBranchErrror("Error to get time");
      setIsLoadingTime(false);
    }
  };
  useEffect(() => {
    fetchToGetBranchName();
    setIsLoading(false);
  }, []);

  const fetBranchName =
    branchName &&
    branchName.length > 0 &&
    branchName.map((item) => item.branch_name);

  const fetchBranchSaleTime =
    branchName &&
    branchName.length > 0 &&
    branchName.map((item) => item.dateOfSale);
  //end to get branchName

  const validationSchema = Yup.object({
    openingamount: Yup.string().required("Please fill out openingamount field"),
    currency: Yup.array()
      .min(1, "Please select at lease one Option of currency")
      .required("Please select at lease one Value of currency"),
  });

  const handleSubmit = async (values) => {
    const formData = {
      openingamount: values.openingamount,
      currency: values.currency,
    };
    try {
      const url = "/branches/updatebranch";
      const response = await axiosInstance.patch(url, formData);
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to create new Branch");
      }
      const createBranchJSON = await response.data;
      toast(createBranchJSON.message);
      setIsManagerDashboard(true);
      setIsDailyUpdateBranch(false);
    } catch (error) {
      console.error(error);
      isError("Error fetching to get time");
    }
  };

  const formik = useFormik({
    initialValues: {
      openingamount: "",
      currency: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  if (isError) {
    return <div className="error">{isError.message}</div>;
  }
  if (isLoading) {
    return <div className="loader"></div>;
  }
  return (
    // <div className="updateDailyBranch">DailyUpdateBranch {fetBranchName}</div>
    <div className="creatnewbranch">
      <h1>Update Branch {fetBranchName}</h1>

      {isLoadingTime && <div className="loader"></div>}
      {fetchBranchSaleTime && (
        <h5>
          Current Server Sales date: {firstTenDigits(fetchBranchSaleTime)}
        </h5>
      )}
      {openBranchError && <h5>{openBranchError}</h5>}
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <label htmlFor="OpeningAmount">
          Opening Amount
          <input
            type="number"
            name="openingamount"
            placeholder="opening amount"
            value={formik.values.openingamount}
            onChange={formik.handleChange}
          />
        </label>
        {formik.touched.openingamount && formik.errors.openingamount && (
          <div className="errors">{formik.errors.openingamount}</div>
        )}
        <fieldset>
          <legend>Select Currencies:</legend>

          <input
            type="checkbox"
            id="USD"
            name="currency"
            value="USD"
            checked={formik.values.currency.includes("USD")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("USD");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("USD"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="USD">USD</label>

          <input
            type="checkbox"
            id="GBP"
            name="currency"
            value="GBP"
            checked={formik.values.currency.includes("GBP")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("GBP");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("GBP"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="GBP">GBP</label>

          <input
            type="checkbox"
            id="YEN"
            name="currency"
            value="YEN"
            checked={formik.values.currency.includes("YEN")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("YEN");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("YEN"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="YEN">YEN</label>

          <input
            type="checkbox"
            id="KYAT"
            name="currency"
            value="KYAT"
            checked={formik.values.currency.includes("KYAT")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("KYAT");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("KYAT"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="KYAT">KYAT</label>

          <input
            type="checkbox"
            id="SINDOLLAR"
            name="currency"
            value="SINDOLLAR"
            checked={formik.values.currency.includes("SINDOLLAR")}
            onChange={(e) => {
              const updatedCurrency = [...formik.values.currency];
              if (e.target.checked) {
                updatedCurrency.push("SINDOLLAR");
              } else {
                updatedCurrency.splice(updatedCurrency.indexOf("SINDOLLAR"), 1);
              }
              formik.setFieldValue("currency", updatedCurrency);
            }}
          />
          <label htmlFor="SINDOLLAR">SINDOLLAR</label>
        </fieldset>
        {formik.touched.currency && formik.errors.currency && (
          <div className="errors">{formik.errors.currency}</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DailyUpdateBranch;
