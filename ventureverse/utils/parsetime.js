export const parseTime = (end) => {
  const dateComponents = end.split("-");
  const year = parseInt(dateComponents[0]);
  const month = parseInt(dateComponents[1]);
  const day = parseInt(dateComponents[2]);
  const date = new Date(year, month - 1, day);
  console.log("привт", Math.floor(date.getTime() / 1000));
  return Math.floor(date.getTime() / 1000);
};
