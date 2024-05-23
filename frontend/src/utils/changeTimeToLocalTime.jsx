const changeTimeToLocalTime = (values) => {
  // 2024-05-21T21:11:16.718Z
  const [datePart, timePart] = values.split("T");
  const [year, month, date] = datePart.split("-");
  const [time, milisecond] = timePart.split(".");
  const [hour, minute, second] = time.split(":");
  const ukTime = `${date}/${month}/${year}, ${hour}:${minute}:${second}`;
  return ukTime;
};
export default changeTimeToLocalTime;
