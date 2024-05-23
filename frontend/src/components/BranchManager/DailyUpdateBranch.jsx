import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firstTenDigits from "../../utils/firstTenDigits";
function DailyUpdateBranch({ setIsManagerDashboard, setIsDailyUpdateBranch }) {
  /*
  url api/branches/updatebranch method patch
  find branch with id 
  localhost:5000/branches/getallbranch to get branch id with header
  i will use useeffect to fetch
  then display branch name after that
  form and submit to change it
  */
  // const [fetBranch, setFetchBranch] = useState("");
  const [branchName, setBranchName] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const headers = { Authorization: token };
  // const [openBranchError, setOpenBranchErrror] = useState(false);
  const headersWithContent = {
    ...headers,
    "Content-Type": "application/json",
  };
  //to get branch Name
  const fetchToGetBranchName = async () => {
    const response = await fetch("/api/branches/getallbranch", { headers });
    if (!response.ok) {
      setIsError(isError);
    }
    const responsesJson = await response.json();
    setBranchName(responsesJson);
  };
  useEffect(() => {
    fetchToGetBranchName();
    setIsLoading(false);
  }, []);

  const fetBranchName =
    branchName &&
    branchName.length > 0 &&
    branchName.map((item) => item.branch_name);

  const fetchBrnachSaleTime =
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
      const url = "/api/branches/updatebranch";
      const response = await fetch(url, {
        method: "PATCH",
        headers: headersWithContent,
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create new Branch");
      }
      const createBranchJSON = await response.json();
      createBranchJSON;
      toast("You update the branch");
      setIsManagerDashboard(true);
      setIsDailyUpdateBranch(false);
    } catch (error) {
      console.error(error);
      isError({ message: error });
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
      {fetchBrnachSaleTime && (
        <h5>
          Current Server Sales date: {firstTenDigits(fetchBrnachSaleTime)}
        </h5>
      )}
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
