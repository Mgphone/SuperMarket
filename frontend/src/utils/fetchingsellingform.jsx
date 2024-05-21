const fetchsellingform = async (FormData, token) => {
  const url = "api/transition/createtransition";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(FormData),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    const responsejson = await response.json();
    return { success: true, responsejson };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An expected error occur" };
  }
};
export default fetchsellingform;
