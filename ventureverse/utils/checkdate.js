export const checkDate = (targetDateString) => {
  const currentDate = new Date();
  const targetDateWithTime = targetDateString + "T00:00:00Z";
  const targetDate = new Date(targetDateWithTime);
  const isFutureDate = targetDate > currentDate;

  if (isFutureDate) {
    return true;
  } else {
    return false;
  }
};
