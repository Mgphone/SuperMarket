const firstTenDigits = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-Gb");
};
export default firstTenDigits;
