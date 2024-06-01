import axiosWithHeader from "./axiosWithHeader";
const fetchsellingform = async (FormData, token) => {
  const axiosInstance = axiosWithHeader(token);
  const url = "/transition/createtransition";
  try {
    const response = await axiosInstance.post(url, FormData);
    if (response.status < 200 || response.status >= 300) {
      const errorMessage = await response.data;
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    const responsejson = await response.data;
    return { success: true, responsejson };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An expected error occur" };
  }
};
export default fetchsellingform;
